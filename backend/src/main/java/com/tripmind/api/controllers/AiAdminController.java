package com.tripmind.api.controllers;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/ai")
@PreAuthorize("hasRole('ADMIN')")
public class AiAdminController {

    private String activeModel = "gemini-1.5-pro";
    private double temperature = 0.7;

    @GetMapping("/config")
    public ResponseEntity<AiConfigDetails> getAiConfig() {
        return ResponseEntity.ok(new AiConfigDetails(activeModel, temperature, 2048, true));
    }

    @PostMapping("/config")
    public ResponseEntity<AiConfigDetails> updateAiConfig(@RequestBody AiConfigDetails config) {
        this.activeModel = config.getActiveModel();
        this.temperature = config.getTemperature();
        return ResponseEntity.ok(config);
    }

    @GetMapping("/prompts")
    public ResponseEntity<List<PromptRecord>> getPromptLibrary() {
        return ResponseEntity.ok(List.of(
                new PromptRecord(UUID.randomUUID(), "itinerary-generation", 3, "Generate a detailed day-by-day travel plan..."),
                new PromptRecord(UUID.randomUUID(), "recommendation-extraction", 1, "Extract top-rated restaurants matching categories...")
        ));
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiConfigDetails {
        private String activeModel;
        private double temperature;
        private int maxTokens;
        private boolean fallbackEnabled;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PromptRecord {
        private UUID id;
        private String name;
        private int version;
        private String content;
    }
}
