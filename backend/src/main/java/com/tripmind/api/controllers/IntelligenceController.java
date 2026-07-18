package com.tripmind.api.controllers;

import com.tripmind.api.services.IntelligenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/intelligence")
public class IntelligenceController {

    private final IntelligenceService intelligenceService;

    public IntelligenceController(IntelligenceService intelligenceService) {
        this.intelligenceService = intelligenceService;
    }

    @GetMapping("/predict")
    public ResponseEntity<Map<String, Object>> getTravelPredictions(
            @RequestParam("destination") String destination,
            @RequestParam(value = "origin", defaultValue = "DEL") String origin) {

        Map<String, Object> prediction = intelligenceService.getTravelPredictions(destination, origin);
        return ResponseEntity.ok(prediction);
    }
}
