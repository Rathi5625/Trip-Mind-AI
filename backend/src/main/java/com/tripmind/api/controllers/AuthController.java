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
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody OtpRequest otpRequest) {
        authService.verifyOtp(otpRequest.getEmail(), otpRequest.getCode(), "SIGNUP");
        return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully."));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse> resendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String type = request.get("type");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email is required."));
        }
        authService.generateAndSaveOtp(email, type != null ? type.toUpperCase() : "SIGNUP");
        return ResponseEntity.ok(new ApiResponse(true, "Verification OTP code has been resent."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        authService.requestPasswordReset(email);
        return ResponseEntity.ok(new ApiResponse(true, "Password reset OTP sent to " + email));
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<ApiResponse> verifyResetOtp(@Valid @RequestBody OtpRequest otpRequest) {
        authService.verifyOtp(otpRequest.getEmail(), otpRequest.getCode(), "RESET_PASSWORD");
        return ResponseEntity.ok(new ApiResponse(true, "Reset OTP verified successfully."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        authService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Password has been reset successfully."));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refreshAccessToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        JwtAuthenticationResponse response = authService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    // Structured helper response DTO
    @lombok.Getter
    @lombok.AllArgsConstructor
    public static class ApiResponse {
        private boolean success;
        private String message;
    }
}
