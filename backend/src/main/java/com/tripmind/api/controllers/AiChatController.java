package com.tripmind.api.controllers;

import com.tripmind.api.services.TavilySearchService;
import com.tripmind.api.services.UnsplashImageService;
import com.tripmind.api.services.ai.AiProviderRouter;
import com.tripmind.api.services.ai.NvidiaImageService;
import com.tripmind.api.services.ai.PromptTemplates;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai-chat")
public class AiChatController {

    private final AiProviderRouter aiProviderRouter;
    private final TavilySearchService tavilySearchService;
    private final UnsplashImageService unsplashImageService;
    private final NvidiaImageService nvidiaImageService;

    public AiChatController(AiProviderRouter aiProviderRouter,
                            TavilySearchService tavilySearchService,
                            UnsplashImageService unsplashImageService,
                            NvidiaImageService nvidiaImageService) {
        this.aiProviderRouter = aiProviderRouter;
        this.tavilySearchService = tavilySearchService;
        this.unsplashImageService = unsplashImageService;
        this.nvidiaImageService = nvidiaImageService;
    }

    /**
     * Research-augmented AI chat endpoint.
     * 1. Searches the web via Tavily for real-time context
     * 2. Passes the research + user message to the AI router
     * 3. Returns a grounded, factual travel answer
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> chatWithAssistant(@RequestBody Map<String, String> request) {
        String message = request.getOrDefault("message", "");
        String tripId  = request.getOrDefault("tripId", "None");
        String history = request.getOrDefault("history", "");

        // Step 1: Search the web for real-time research context
        String webResearch = tavilySearchService.search(message);

        // Step 2: Build an enriched prompt with web context if available
        String tripContext = "User is exploring destinations or has trip id: " + tripId;
        String prompt;
        if (webResearch != null && !webResearch.isBlank()) {
            prompt = "You are VoyageAI, a premium AI travel assistant with access to real-time web research.\n\n" +
                     "Use the following web research to give an accurate, up-to-date answer:\n" +
                     webResearch + "\n\n" +
                     "Trip context: " + tripContext + "\n\n" +
                     "Conversation history:\n" + history + "\n\n" +
                     "User: " + message + "\n" +
                     "VoyageAI: Provide a detailed, helpful, and personalized answer based on the research above.";
        } else {
            // Fallback to standard prompt when Tavily is not yet configured
            prompt = PromptTemplates.getChatResponsePrompt(tripContext, message, history);
        }

        // Step 3: Generate AI response
        String reply = aiProviderRouter.generateText(prompt);

        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        response.put("researchUsed", webResearch != null ? "true" : "false");
        return ResponseEntity.ok(response);
    }

    /**
     * Dynamic destination image endpoint.
     * If NVIDIA Image service is configured, returns a URL pointing to the raw AI generated image.
     * Otherwise, falls back to a live Unsplash photo.
     */
    @GetMapping("/image")
    public ResponseEntity<Map<String, String>> getDestinationImage(@RequestParam("q") String query) {
        String imageUrl;
        if (nvidiaImageService.isConfigured()) {
            // Return our dynamic endpoint URL
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            imageUrl = baseUrl + "/api/ai-chat/image/raw?q=" + URLEncoder.encode(query, StandardCharsets.UTF_8);
        } else {
            imageUrl = unsplashImageService.fetchDestinationImage(query);
        }

        Map<String, String> response = new HashMap<>();
        response.put("imageUrl", imageUrl);
        response.put("query", query);
        return ResponseEntity.ok(response);
    }

    /**
     * Serves the raw binary generated image content (from FLUX.1-schnell model).
     * Automatically falls back to Unsplash if generation fails.
     */
    @GetMapping(value = "/image/raw", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getRawImage(@RequestParam("q") String query) {
        byte[] imageBytes = null;
        if (nvidiaImageService.isConfigured()) {
            imageBytes = nvidiaImageService.generateImage(query);
        }

        if (imageBytes != null && imageBytes.length > 0) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
        }

        // Fallback to fetching Unsplash and returning the bytes or redirecting
        try {
            String unsplashUrl = unsplashImageService.fetchDestinationImage(query);
            return ResponseEntity.status(302)
                    .header("Location", unsplashUrl)
                    .build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}


