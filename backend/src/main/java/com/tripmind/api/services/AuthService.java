package com.tripmind.api.services;

import java.util.UUID;
import com.tripmind.api.dtos.*;
import com.tripmind.api.entities.Otp;
import com.tripmind.api.entities.Role;
import com.tripmind.api.entities.RoleName;
import com.tripmind.api.entities.User;
import com.tripmind.api.exceptions.BadRequestException;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.OtpRepository;
import com.tripmind.api.repositories.RoleRepository;
import com.tripmind.api.repositories.UserRepository;
import com.tripmind.api.security.JwtTokenProvider;
import com.tripmind.api.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final JavaMailSender mailSender;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       OtpRepository otpRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       JavaMailSender mailSender) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.mailSender = mailSender;
    }

    public JwtAuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isVerified()) {
            generateAndSaveOtp(user.getEmail(), "SIGNUP");
            throw new BadRequestException("Please verify your email address first. A new verification OTP code has been sent to your inbox.");
        }

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .isVerified(user.isVerified())
                .roles(user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()))
                .build();

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken)
                .user(userDto)
                .build();
    }

    @Transactional
    public UserDto signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email Address already in use!");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new BadRequestException("Default User Role not set."));

        User user = User.builder()
                .name(signupRequest.getFullName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .roles(Collections.singleton(userRole))
                .isVerified(false)
                .build();

        User savedUser = userRepository.save(user);

        // Generate Verification OTP
        generateAndSaveOtp(savedUser.getEmail(), "SIGNUP");

        return UserDto.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .isVerified(savedUser.isVerified())
                .roles(savedUser.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()))
                .build();
    }

    @Transactional
    public void generateAndSaveOtp(String email, String type) {
        // Delete older OTPs for the same action/email
        otpRepository.deleteByEmailAndType(email, type);

        // Standard 6 digit OTP code
        String code = String.format("%06d", new Random().nextInt(999999));
        
        // Log code for demo logging purposes
        System.out.println("====== GENERATED OTP FOR " + email + " (" + type + "): " + code + " ======");

        Otp otp = Otp.builder()
                .email(email)
                .code(code)
                .type(type)
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .build();

        otpRepository.save(otp);

        // Try sending email via SMTP
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Trip Mind AI - Verification Code");
            message.setText("Hello,\n\nYour Trip Mind AI verification code is: " + code + "\n\nThis code will expire in 10 minutes.\n\nHappy travels,\nTrip Mind AI Team");
            mailSender.send(message);
            System.out.println("====== SUCCESS: OTP SENT TO EMAIL " + email + " ======");
        } catch (Exception e) {
            System.err.println("====== ERROR SENDING OTP TO EMAIL " + email + ": " + e.getMessage() + " ======");
        }
    }

    @Transactional
    public boolean verifyOtp(String email, String code, String type) {
        Otp otp = otpRepository.findFirstByEmailAndTypeOrderByExpiresAtDesc(email, type)
                .orElseThrow(() -> new BadRequestException("No active OTP code found."));

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otp);
            throw new BadRequestException("OTP has expired.");
        }

        if (!otp.getCode().equals(code)) {
            throw new BadRequestException("Invalid OTP code.");
        }

        // Remove OTP record upon successful match
        otpRepository.delete(otp);

        if ("SIGNUP".equalsIgnoreCase(type)) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            user.setVerified(true);
            userRepository.save(user);
        }

        return true;
    }

    @Transactional
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No account registered with email " + email));

        generateAndSaveOtp(user.getEmail(), "RESET_PASSWORD");
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        verifyOtp(resetPasswordRequest.getEmail(), resetPasswordRequest.getCode(), "RESET_PASSWORD");

        User user = userRepository.findByEmail(resetPasswordRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        userRepository.save(user);
    }

    public JwtAuthenticationResponse refreshAccessToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new BadRequestException("Invalid Refresh Token");
        }

        UUID userId = tokenProvider.getUserIdFromJWT(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String newAccessToken = tokenProvider.generateAccessTokenFromUserId(userId);

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .isVerified(user.isVerified())
                .roles(user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()))
                .build();

        return JwtAuthenticationResponse.builder()
                .token(newAccessToken)
                .refreshToken(refreshToken)
                .user(userDto)
                .build();
    }
}
