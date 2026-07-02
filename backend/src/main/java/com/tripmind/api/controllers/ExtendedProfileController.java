package com.tripmind.api.controllers;

import com.tripmind.api.security.UserPrincipal;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile/extended")
public class ExtendedProfileController {

    @GetMapping
    public ResponseEntity<ExtendedProfileResponse> getExtendedProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        ExtendedProfileResponse response = ExtendedProfileResponse.builder()
                .userId(userPrincipal.getId())
                .countriesVisitedCount(12)
                .favoriteDestinations(List.of("Tokyo", "Paris", "Bali"))
                .badges(List.of("Globe Trotter", "AI Travel Pioneer", "Elite Nomad"))
                .emergencyContactName("Sarah Miller")
                .emergencyContactPhone("+1-555-0199")
                .passportNumber("US-XXXXX129")
                .travelerType("Luxury Adventurer")
                .build();

        return ResponseEntity.ok(response);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExtendedProfileResponse {
        private UUID userId;
        private int countriesVisitedCount;
        private List<String> favoriteDestinations;
        private List<String> badges;
        private String emergencyContactName;
        private String emergencyContactPhone;
        private String passportNumber;
        private String travelerType;
    }
}
