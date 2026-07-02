package com.tripmind.api.controllers;

import com.tripmind.api.security.UserPrincipal;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit")
public class AuditLogController {

    @GetMapping("/logs")
    public ResponseEntity<List<AuditRecord>> getSecurityLogs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<AuditRecord> logs = List.of(
                new AuditRecord(UUID.randomUUID(), userPrincipal.getId(), "USER_LOGIN", "127.0.0.1", "Successful authentication via JWT", LocalDateTime.now().minusHours(2)),
                new AuditRecord(UUID.randomUUID(), userPrincipal.getId(), "PROFILE_UPDATE", "127.0.0.1", "Updated email settings", LocalDateTime.now().minusDays(1)),
                new AuditRecord(UUID.randomUUID(), userPrincipal.getId(), "TRIP_CREATE", "127.0.0.1", "Created new trip to Tokyo", LocalDateTime.now().minusDays(3))
        );

        return ResponseEntity.ok(logs);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuditRecord {
        private UUID id;
        private UUID userId;
        private String action;
        private String ipAddress;
        private String details;
        private LocalDateTime timestamp;
    }
}
