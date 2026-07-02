package com.tripmind.api.controllers;

import com.tripmind.api.services.ai.GeminiClientService;
import com.tripmind.api.services.ai.PromptTemplates;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai-chat")
public class AiChatController {

    private final GeminiClientService geminiClientService;

    public AiChatController(GeminiClientService geminiClientService) {
        this.geminiClientService = geminiClientService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> chatWithAssistant(@RequestBody Map<String, String> request) {
        String message = request.getOrDefault("message", "");
        String tripId = request.getOrDefault("tripId", "None");
        String history = request.getOrDefault("history", "");

        String tripContext = "User is exploring destinations or has trip id: " + tripId;
        String prompt = PromptTemplates.getChatResponsePrompt(tripContext, message, history);

        String reply = geminiClientService.generateText(prompt);

        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return ResponseEntity.ok(response);
    }
}
