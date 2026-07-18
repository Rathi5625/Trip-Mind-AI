package com.tripmind.api.controllers;

import com.tripmind.api.dtos.*;
import com.tripmind.api.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtAuthenticationResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        UserDto response = authService.signup(signupRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyOtp(@Valid @RequestBody OtpRequest otpRequest) {
        authService.verifyOtp(otpRequest.getEmail(), otpRequest.getCode(), "SIGNUP");
        return ResponseEntity.ok(ApiResponse.success(null, "OTP verified successfully."));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Void>> resendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String type = request.get("type");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, "Email is required."));
        }
        authService.generateAndSaveOtp(email, type != null ? type.toUpperCase() : "SIGNUP");
        return ResponseEntity.ok(ApiResponse.success(null, "Verification OTP code has been resent."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        authService.requestPasswordReset(email);
        return ResponseEntity.ok(ApiResponse.success(null, "Password reset OTP sent to " + email));
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<ApiResponse<Void>> verifyResetOtp(@Valid @RequestBody OtpRequest otpRequest) {
        authService.verifyOtp(otpRequest.getEmail(), otpRequest.getCode(), "RESET_PASSWORD");
        return ResponseEntity.ok(ApiResponse.success(null, "Reset OTP verified successfully."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok(ApiResponse.success(null, "Password has been reset successfully."));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refreshAccessToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        JwtAuthenticationResponse response = authService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(response);
    }
}
