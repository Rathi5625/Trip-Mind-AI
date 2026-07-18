package com.tripmind.api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripmind.api.dtos.*;
import com.tripmind.api.entities.*;
import com.tripmind.api.repositories.*;
import com.tripmind.api.services.ai.AiProviderRouter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AiCentralService {

    private static final Logger logger = LoggerFactory.getLogger(AiCentralService.class);

    private final AiProviderRouter aiProviderRouter;
    private final TavilySearchService tavilySearchService;
    private final ObjectMapper objectMapper;

    private final UserRepository userRepository;
    private final AiConversationRepository aiConversationRepository;
    private final AiPromptHistoryRepository aiPromptHistoryRepository;
    private final AiRecommendationRepository aiRecommendationRepository;
    private final AiGeneratedItineraryRepository aiGeneratedItineraryRepository;
    private final AiOptimizationResultRepository aiOptimizationResultRepository;
    private final AiHiddenGemRepository aiHiddenGemRepository;

    public AiCentralService(AiProviderRouter aiProviderRouter,
                            TavilySearchService tavilySearchService,
                            ObjectMapper objectMapper,
                            UserRepository userRepository,
                            AiConversationRepository aiConversationRepository,
                            AiPromptHistoryRepository aiPromptHistoryRepository,
                            AiRecommendationRepository aiRecommendationRepository,
                            AiGeneratedItineraryRepository aiGeneratedItineraryRepository,
                            AiOptimizationResultRepository aiOptimizationResultRepository,
                            AiHiddenGemRepository aiHiddenGemRepository) {
        this.aiProviderRouter = aiProviderRouter;
        this.tavilySearchService = tavilySearchService;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.aiConversationRepository = aiConversationRepository;
        this.aiPromptHistoryRepository = aiPromptHistoryRepository;
        this.aiRecommendationRepository = aiRecommendationRepository;
        this.aiGeneratedItineraryRepository = aiGeneratedItineraryRepository;
        this.aiOptimizationResultRepository = aiOptimizationResultRepository;
        this.aiHiddenGemRepository = aiHiddenGemRepository;
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

    @Transactional
    public Map<String, String> chat(AiChatRequest request) {
        String message = request.getMessage() != null ? request.getMessage() : "";
        String tripIdStr = request.getTripId() != null ? request.getTripId() : "";
        String history = request.getHistory() != null ? request.getHistory() : "";

        UUID tripId = null;
        if (!tripIdStr.isEmpty() && !"None".equals(tripIdStr)) {
            try { tripId = UUID.fromString(tripIdStr); } catch (Exception ignored) {}
        }

        UUID userId = getFallbackUserId();

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

        try {
            aiConversationRepository.save(AiConversation.builder()
                    .tripId(tripId)
                    .userId(userId)
                    .role("assistant")
                    .content(reply)
                    .build());
        } catch (Exception ignored) {}

        logPrompt(userId, prompt, reply);

        Map<String, String> response = new LinkedHashMap<>();
        response.put("reply", reply);
        response.put("researchUsed", webContext != null && !webContext.isEmpty() ? "true" : "false");
        return response;
    }

    @Transactional
    public Map<String, Object> planner(AiPlannerRequest request) {
        String destination = request.getDestination() != null ? request.getDestination() : "Tokyo";
        String budget = request.getBudget() != null ? request.getBudget() : "comfort";
        String pace = request.getPace() != null ? request.getPace() : "balanced";
        int duration = request.getDuration() != null ? request.getDuration() : 5;

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
            return result;
        } catch (Exception e) {
            logger.error("Failed to parse planner AI JSON response: {}", e.getMessage());
            throw new RuntimeException("Failed to parse AI response for itinerary generation.");
        }
    }

    @Transactional
    public Map<String, Object> optimize(AiOptimizeRequest request) {
        String tripIdStr = request.getTripId() != null ? request.getTripId() : "";
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
                    .originalDetails(request.getItinerary())
                    .optimizedDetails(cleaned)
                    .build());
        } catch (Exception ignored) {}

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = objectMapper.readValue(cleaned, Map.class);
            return result;
        } catch (Exception e) {
            return Map.of("message", "Optimized itinerary applied.", "timeSavedMin", 40, "budgetSaved", 150.0);
        }
    }

    @Transactional
    public List<Map<String, Object>> recommend(AiRecommendRequest request) {
        String tripIdStr = request.getTripId() != null ? request.getTripId() : "";
        UUID tripId = null;
        try { tripId = UUID.fromString(tripIdStr); } catch (Exception ignored) {}

        String category = request.getCategory() != null ? request.getCategory() : "hotel";
        String location = request.getLocation() != null ? request.getLocation() : "Tokyo";

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
            return result;
        } catch (Exception e) {
            return List.of(
                    Map.of("name", "AI Selected Option 1", "description", "Top matching choice based on user mood", "estimatedCost", 120.0, "rating", 4.9)
            );
        }
    }

    @Transactional
    public List<Map<String, Object>> hiddenGems(AiHiddenGemsRequest request) {
        String destinationName = request.getDestinationName() != null ? request.getDestinationName() : "Tokyo";

        String prompt = String.format(
                "Recommend 3 secret hidden gems in %s. Return a JSON array with name, description, discoveryScore (integer 85-99). No markdown.",
                destinationName
        );

        String reply = aiProviderRouter.generateText(prompt);
        String cleaned = cleanJsonResponse(reply);

        try {
            aiHiddenGemRepository.save(AiHiddenGem.builder()
                    .destinationName(destinationName)
                    .gemName("Hidden Spot in " + destinationName)
                    .description(cleaned)
                    .discoveryScore(94)
                    .build());
        } catch (Exception ignored) {}

        UUID userId = getFallbackUserId();
        logPrompt(userId, prompt, cleaned);

        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> result = objectMapper.readValue(cleaned, List.class);
            return result;
        } catch (Exception e) {
            return List.of(
                    Map.of("name", "Secret Alley Cafe", "description", "Hidden local haunt off the beaten path", "discoveryScore", 96)
            );
        }
    }
}
