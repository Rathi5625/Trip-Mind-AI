package com.tripmind.api.controllers;

import com.tripmind.api.dtos.*;
import com.tripmind.api.services.AiCentralService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiCentralController {

    private final AiCentralService aiCentralService;

    public AiCentralController(AiCentralService aiCentralService) {
        this.aiCentralService = aiCentralService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@Valid @RequestBody AiChatRequest request) {
        Map<String, String> response = aiCentralService.chat(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/planner")
    public ResponseEntity<Map<String, Object>> planner(@Valid @RequestBody AiPlannerRequest request) {
        Map<String, Object> response = aiCentralService.planner(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/optimize")
    public ResponseEntity<Map<String, Object>> optimize(@Valid @RequestBody AiOptimizeRequest request) {
        Map<String, Object> response = aiCentralService.optimize(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recommend")
    public ResponseEntity<List<Map<String, Object>>> recommend(@Valid @RequestBody AiRecommendRequest request) {
        List<Map<String, Object>> response = aiCentralService.recommend(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/hidden-gems")
    public ResponseEntity<List<Map<String, Object>>> hiddenGems(@Valid @RequestBody AiHiddenGemsRequest request) {
        List<Map<String, Object>> response = aiCentralService.hiddenGems(request);
        return ResponseEntity.ok(response);
    }
}
