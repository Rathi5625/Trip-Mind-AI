package com.tripmind.api.controllers;

import com.tripmind.api.dtos.PreferenceDto;
import com.tripmind.api.dtos.UserDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        UserDto response = userService.getUserProfile(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody Map<String, String> request) {
        UserDto response = userService.updateUserProfile(
                userPrincipal.getId(),
                request.get("name"),
                request.get("email")
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/preferences")
    public ResponseEntity<PreferenceDto> getUserPreferences(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        PreferenceDto response = userService.getUserPreferences(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/preferences")
    public ResponseEntity<PreferenceDto> updateUserPreferences(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody PreferenceDto preferenceDto) {
        PreferenceDto response = userService.updateUserPreferences(userPrincipal.getId(), preferenceDto);
        return ResponseEntity.ok(response);
    }
}
