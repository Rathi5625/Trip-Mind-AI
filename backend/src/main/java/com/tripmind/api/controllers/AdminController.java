package com.tripmind.api.controllers;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserRecord>> getAllUsers() {
        // Return baseline users log
        return ResponseEntity.ok(List.of(
                new AdminUserRecord(UUID.randomUUID(), "traveler@tripmind.ai", "ROLE_USER", false),
                new AdminUserRecord(UUID.randomUUID(), "admin@tripmind.ai", "ROLE_ADMIN", false)
        ));
    }

    @PostMapping("/users/{id}/lock")
    public ResponseEntity<Void> lockUser(@PathVariable UUID id, @RequestParam("lock") boolean lock) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/broadcast")
    public ResponseEntity<Void> broadcastNotification(@RequestParam("message") String message) {
        return ResponseEntity.ok().build();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminUserRecord {
        private UUID id;
        private String email;
        private String role;
        private boolean isLocked;
    }
}
