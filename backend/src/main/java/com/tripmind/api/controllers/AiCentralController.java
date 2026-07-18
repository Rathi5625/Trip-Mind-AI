package com.tripmind.api.controllers;

import com.tripmind.api.services.AiCentralService;
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
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        Map<String, String> response = aiCentralService.chat(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/planner")
    public ResponseEntity<Map<String, Object>> planner(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = aiCentralService.planner(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/optimize")
    public ResponseEntity<Map<String, Object>> optimize(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = aiCentralService.optimize(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recommend")
    public ResponseEntity<List<Map<String, Object>>> recommend(@RequestBody Map<String, String> request) {
        List<Map<String, Object>> response = aiCentralService.recommend(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/hidden-gems")
    public ResponseEntity<List<Map<String, Object>>> hiddenGems(@RequestBody Map<String, String> request) {
        List<Map<String, Object>> response = aiCentralService.hiddenGems(request);
        return ResponseEntity.ok(response);
    }
}
