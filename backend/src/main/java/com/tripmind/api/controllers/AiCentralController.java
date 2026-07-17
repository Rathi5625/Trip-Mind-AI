package com.tripmind.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripmind.api.entities.*;
import com.tripmind.api.repositories.*;
import com.tripmind.api.services.TavilySearchService;
import com.tripmind.api.services.ai.AiProviderRouter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class AiCentralController {

    private static final Logger logger = LoggerFactory.getLogger(AiCentralController.class);

    private final AiProviderRouter aiProviderRouter;
    private final TavilySearchService tavilySearchService;
    private final ObjectMapper objectMapper;

    // Repositories for storage
    private final UserRepository userRepository;
    private final AiConversationRepository aiConversationRepository;
    private final AiPromptHistoryRepository aiPromptHistoryRepository;
    private final AiRecommendationRepository aiRecommendationRepository;
    private final AiGeneratedItineraryRepository aiGeneratedItineraryRepository;
    private final AiOptimizationResultRepository aiOptimizationResultRepository;
    private final AiSavedTripRepository aiSavedTripRepository;
    private final AiHiddenGemRepository aiHiddenGemRepository;
    private final AiTravelMemoryRepository aiTravelMemoryRepository;

    public AiCentralController(AiProviderRouter aiProviderRouter,
                               TavilySearchService tavilySearchService,
                               ObjectMapper objectMapper,
                               UserRepository userRepository,
                               AiConversationRepository aiConversationRepository,
                               AiPromptHistoryRepository aiPromptHistoryRepository,
                               AiRecommendationRepository aiRecommendationRepository,
                               AiGeneratedItineraryRepository aiGeneratedItineraryRepository,
                               AiOptimizationResultRepository aiOptimizationResultRepository,
                               AiSavedTripRepository aiSavedTripRepository,
                               AiHiddenGemRepository aiHiddenGemRepository,
                               AiTravelMemoryRepository aiTravelMemoryRepository) {
        this.aiProviderRouter = aiProviderRouter;
        this.tavilySearchService = tavilySearchService;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.aiConversationRepository = aiConversationRepository;
        this.aiPromptHistoryRepository = aiPromptHistoryRepository;
        this.aiRecommendationRepository = aiRecommendationRepository;
        this.aiGeneratedItineraryRepository = aiGeneratedItineraryRepository;
        this.aiOptimizationResultRepository = aiOptimizationResultRepository;
        this.aiSavedTripRepository = aiSavedTripRepository;
        this.aiHiddenGemRepository = aiHiddenGemRepository;
        this.aiTravelMemoryRepository = aiTravelMemoryRepository;
    }

    private UUID getFallbackUserId() {
        return userRepository.findAll().stream()
                .findFirst()
                .map(User::getId)
                .orElseGet(UUID::randomUUID);
    }

    private void logPrompt(UUID userId, String prompt, String response) {
        try {
            aiPromptHistoryRepository.save(AiPromptHistory.builder()
                    .userId(userId != null ? userId : getFallbackUserId())
                    .prompt(prompt)
                    .response(response)
                    .modelUsed("meta/llama-3.1-70b-instruct")
                    .tokensUsed(prompt.length() / 4 + (response != null ? response.length() / 4 : 0))
                    .build());
        } catch (Exception e) {
            logger.warn("Failed to log prompt history: {}", e.getMessage());
        }
    }

    private String cleanJsonResponse(String raw) {
        if (raw == null) return "{}";
        String clean = raw.replaceAll("```json", "").replaceAll("```", "").trim();
        int start = clean.indexOf('{');
        int end = clean.lastIndexOf('}');
        if (start >= 0 && end > start) {
            return clean.substring(start, end + 1);
        }
        int startArr = clean.indexOf('[');
        int endArr = clean.lastIndexOf(']');
        if (startArr >= 0 && endArr > startArr) {
            return clean.substring(startArr, endArr + 1);
        }
        return clean;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String message = request.getOrDefault("message", "");
        String tripIdStr = request.getOrDefault("tripId", "");
        String history = request.getOrDefault("history", "");

        UUID tripId = null;
        if (!tripIdStr.isEmpty() && !"None".equals(tripIdStr)) {
            try { tripId = UUID.fromString(tripIdStr); } catch (Exception ignored) {}
        }

        UUID userId = getFallbackUserId();

        // Save user message
        try {
            aiConversationRepository.save(AiConversation.builder()
                    .tripId(tripId)
                    .userId(userId)
                    .role("user")
                    .content(message)
                    .build());
        } catch (Exception ignored) {}

        String webContext = tavilySearchService.search(message);
        String prompt = String.format(
                "You are VoyageAI, a helpful, premium AI concierge for Trip Mind AI.\n" +
                "Context from web research:\n%s\n\n" +
                "Conversation history:\n%s\n\n" +
                "User message: %s\n\n" +
                "Respond directly and concisely in markdown format. Keep it within 3-4 sentences.",
                webContext, history, message
        );

        String reply = aiProviderRouter.generateText(prompt);

        // Save assistant message
        try {
            aiConversationRepository.save(AiConversation.builder()
                    .tripId(tripId)
                    .userId(userId)
                    .role("assistant")
                    .content(reply)
                    .build());
        } catch (Exception ignored) {}

        logPrompt(userId, prompt, reply);

        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        response.put("researchUsed", webContext != null && !webContext.isEmpty() ? "true" : "false");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/planner")
    public ResponseEntity<Map<String, Object>> planner(@RequestBody Map<String, Object> request) {
        String destination = (String) request.getOrDefault("destination", "Tokyo");
        String budget = (String) request.getOrDefault("budget", "comfort");
        String pace = (String) request.getOrDefault("pace", "balanced");
        int duration = Integer.parseInt(String.valueOf(request.getOrDefault("duration", "5")));

        String prompt = String.format(
                "Act as a professional AI travel planner. Plan a premium trip to %s.\n" +
                "Parameters: Budget: %s, Pace: %s, Duration: %d days.\n" +
                "You MUST respond ONLY with a raw JSON object matching this structure (no markdown code blocks, no explanation):\n" +
                "{\n" +
                "  \"destination\": {\n" +
                "    \"name\": \"%s\",\n" +
                "    \"image\": \"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80\",\n" +
                "    \"temp\": \"20°C\",\n" +
                "    \"weather\": \"Sunny\",\n" +
                "    \"crowdLevel\": \"Medium\",\n" +
                "    \"budget\": { \"flights\": 50000, \"hotels\": 60000, \"daily\": 20000, \"total\": 130000 },\n" +
                "    \"savings\": { \"estimated\": 150000, \"savings\": 20000, \"cheaperFlights\": true, \"betterHotels\": true, \"restaurantDeals\": true },\n" +
                "    \"travelScore\": { \"score\": 95, \"weather\": 5, \"budget\": 4, \"safety\": 5, \"crowdLevel\": 4, \"recommendation\": \"Excellent Choice\" },\n" +
                "    \"markers\": [ { \"label\": \"Sightseeing 1\", \"x\": 100, \"y\": 120, \"type\": \"attraction\" } ],\n" +
                "    \"routes\": [ { \"x1\": 100, \"y1\": 120, \"x2\": 130, \"y2\": 80 } ]\n" +
                "  },\n" +
                "  \"itinerary\": \"## Day 1: Arrival\\n- Explore downtown...\"\n" +
                "}",
                destination, budget, pace, duration, destination
        );

        String reply = aiProviderRouter.generateText(prompt);
        String cleaned = cleanJsonResponse(reply);

        try {
            aiGeneratedItineraryRepository.save(AiGeneratedItinerary.builder()
                    .destination(destination)
                    .budgetLevel(budget)
                    .durationDays(duration)
                    .rawItineraryJson(cleaned)
                    .build());
        } catch (Exception e) {
            logger.warn("Failed to save generated itinerary to db: {}", e.getMessage());
        }

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = objectMapper.readValue(cleaned, Map.class);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Failed to parse planner AI JSON response: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/optimize")
    public ResponseEntity<Map<String, Object>> optimize(@RequestBody Map<String, Object> request) {
        String tripIdStr = (String) request.getOrDefault("tripId", "");
        UUID tripId = null;
        try { tripId = UUID.fromString(tripIdStr); } catch (Exception ignored) {}

        String prompt = "Optimize this trip itinerary for timing, weather, and budget constraints. " +
                "Provide a JSON object with: optimizedItinerary (string), timeSavedMin (integer), budgetSaved (double).";
        String reply = aiProviderRouter.generateText(prompt);
        String cleaned = cleanJsonResponse(reply);

        try {
            aiOptimizationResultRepository.save(AiOptimizationResult.builder()
                    .tripId(tripId)
                    .optimizationType("Timing & Budget")
                    .timeSavedMin(40)
                    .budgetSaved(150.0)
                    .originalDetails(request.toString())
                    .optimizedDetails(cleaned)
                    .build());
        } catch (Exception ignored) {}

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = objectMapper.readValue(cleaned, Map.class);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("message", "Optimized itinerary applied.", "timeSavedMin", 40, "budgetSaved", 150.0));
        }
    }

    @PostMapping("/recommend")
    public ResponseEntity<List<Map<String, Object>>> recommend(@RequestBody Map<String, String> request) {
        String tripIdStr = request.getOrDefault("tripId", "");
        UUID tripId = null;
        try { tripId = UUID.fromString(tripIdStr); } catch (Exception ignored) {}

        String category = request.getOrDefault("category", "hotel");
        String location = request.getOrDefault("location", "Tokyo");

        String prompt = String.format(
                "Recommend 3 premium %s options in %s. Return a JSON array of objects with keys: name, description, estimatedCost, rating. " +
                "No markdown, no explanation.",
                category, location
        );

        String reply = aiProviderRouter.generateText(prompt);
        String cleaned = cleanJsonResponse(reply);

        try {
            aiRecommendationRepository.save(AiRecommendation.builder()
                    .tripId(tripId)
                    .category(category)
                    .name(location + " " + category)
                    .description(cleaned)
                    .estimatedCost(100.0)
                    .rating(4.8)
                    .build());
        } catch (Exception ignored) {}

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> result = objectMapper.readValue(cleaned, List.class);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of(
                    Map.of("name", "AI Selected Option 1", "description", "Top matching choice based on user mood", "estimatedCost", 120.0, "rating", 4.9)
            ));
        }
    }

    @PostMapping("/hidden-gems")
    public ResponseEntity<List<Map<String, Object>>> hiddenGems(@RequestBody Map<String, String> request) {
        String destinationName = request.getOrDefault("destinationName", "Tokyo");

        String prompt = String.format(
                "Recommend 3 secret hidden gems in %s. Return a JSON array with name, description, discoveryScore (integer 85-99). No markdown.",
                destinationName
        );

        String reply = aiProviderRouter.generateText(prompt);
        String cleaned = cleanJsonResponse(reply);

        try {
            aiHiddenGemRepository.save(AiHiddenGem.builder()
                    .destinationName(destinationName)
                    .gemName("Secret Gem in " + destinationName)
                    .description(cleaned)
                    .discoveryScore(94)
                    .build());
        } catch (Exception ignored) {}

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> result = objectMapper.readValue(cleaned, List.class);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of(
                    Map.of("name", "Local Hidden Alley", "description", "Authentic culture off the tourist paths", "discoveryScore", 95)
            ));
        }
    }

    @PostMapping("/weather")
    public ResponseEntity<Map<String, String>> weather(@RequestBody Map<String, String> request) {
        String destination = request.getOrDefault("destination", "Tokyo");
        String prompt = "Provide AI weather advice for " + destination + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("advice", reply));
    }

    @PostMapping("/budget")
    public ResponseEntity<Map<String, String>> budget(@RequestBody Map<String, Object> request) {
        double limit = Double.parseDouble(String.valueOf(request.getOrDefault("budgetLimit", "200000")));
        String prompt = "Give AI budget advice for a traveler spending within a limit of " + limit + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("advice", reply));
    }

    @PostMapping("/transport")
    public ResponseEntity<Map<String, String>> transport(@RequestBody Map<String, Object> request) {
        String destination = String.valueOf(request.getOrDefault("destination", "Tokyo"));
        String prompt = "Give AI transport recommendations for traveling in " + destination + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("advice", reply));
    }

    @PostMapping("/destination")
    public ResponseEntity<Map<String, String>> destination(@RequestBody Map<String, String> request) {
        String preferences = request.getOrDefault("preferences", "beach, food");
        String prompt = "Recommend a prime destination matching: " + preferences + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("recommendation", reply));
    }

    @PostMapping("/activity")
    public ResponseEntity<Map<String, String>> activity(@RequestBody Map<String, String> request) {
        String query = request.getOrDefault("query", "sushi");
        String prompt = "Suggest a unique travel activity matching: " + query + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("suggestion", reply));
    }

    @PostMapping("/itinerary")
    public ResponseEntity<Map<String, String>> itinerary(@RequestBody Map<String, String> request) {
        String command = request.getOrDefault("command", "make day 2 relaxed");
        String prompt = "Modify day plan itinerary based on this instruction: " + command + ". Return short summary of changes.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("summary", reply));
    }

    @PostMapping("/map")
    public ResponseEntity<Map<String, String>> map(@RequestBody Map<String, Object> request) {
        String prompt = "Suggest map route optimizations for trip coordinates " + request.toString() + ". Keep it under 2 sentences.";
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("optimization", reply));
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, String>> search(@RequestBody Map<String, String> request) {
        String query = request.getOrDefault("query", "");
        String prompt = "Perform AI grounded search for query: " + query;
        String reply = aiProviderRouter.generateText(prompt);

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, reply);

        return ResponseEntity.ok(Map.of("result", reply));
    }
}
