package com.tripmind.api.controllers;

import com.tripmind.api.security.UserPrincipal;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final List<DocumentRecord> mockStore = new ArrayList<>();

    @PostMapping("/upload")
    public ResponseEntity<DocumentRecord> uploadDocument(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody UploadRequest request) {

        DocumentRecord record = DocumentRecord.builder()
                .id(UUID.randomUUID())
                .userId(userPrincipal.getId())
                .name(request.getName())
                .category(request.getCategory())
                .fileUrl("https://tripmind.ai/storage/files/" + UUID.randomUUID() + ".pdf")
                .fileSize(1024L * 250) // Mock 250 KB
                .mimeType("application/pdf")
                .createdAt(LocalDateTime.now())
                .build();

        mockStore.add(record);
        return ResponseEntity.ok(record);
    }

    @GetMapping
    public ResponseEntity<List<DocumentRecord>> getUserDocuments(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<DocumentRecord> response = mockStore.stream()
                .filter(d -> d.getUserId().equals(userPrincipal.getId()))
                .toList();
        return ResponseEntity.ok(response);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DocumentRecord {
        private UUID id;
        private UUID userId;
        private String name;
        private String category; // PASSPORT, VISA, TICKET, RESERVATION, INSURANCE, PHOTO, RECEIPT
        private String fileUrl;
        private Long fileSize;
        private String mimeType;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UploadRequest {
        private String name;
        private String category;
        private String base64Content;
    }
}
