package com.tripmind.api.services.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AiTravelEngine {

    private static final Logger logger = LoggerFactory.getLogger(AiTravelEngine.class);

    private final AiProviderRouter aiProviderRouter;
    private final ObjectMapper objectMapper;

    public AiTravelEngine(AiProviderRouter aiProviderRouter, ObjectMapper objectMapper) {
        this.aiProviderRouter = aiProviderRouter;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> analyzeTravelStyle(List<String> travelerTypes, String pacePreference) {
        String prompt = String.format(
            "Analyze the following traveler profile and return a JSON object with these exact keys: " +
            "style (string), pace (string), dnaMatch (integer 85-99), insights (array of 2 strings).\n" +
            "Traveler types: %s\nPreferred pace: %s\n" +
            "Respond ONLY with valid raw JSON. No markdown. No explanation.",
            String.join(", ", travelerTypes), pacePreference
        );
        try {
            String raw = aiProviderRouter.generateText(prompt);
            String cleaned = raw.replaceAll("`json", "").replaceAll("`", "").trim();
            @SuppressWarnings("unchecked")
            Map<String, Object> result = objectMapper.readValue(cleaned, Map.class);
            return result;
        } catch (Exception e) {
            logger.warn("[AiTravelEngine] analyzeTravelStyle failed: {}", e.getMessage());
        }
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("style", travelerTypes.isEmpty() ? "Explorer" : travelerTypes.get(0));
        fallback.put("pace", pacePreference);
        fallback.put("dnaMatch", 92);
        fallback.put("insights", List.of(
            "You prefer a " + pacePreference + " journey with deep cultural immersions.",
            "Recommended focus: Local gastronomy, historic quarters, and scenic explorations."
        ));
        return fallback;
    }

    public List<String> generatePackingList(String destination, String season) {
        String prompt = PromptTemplates.getPackingRecommendationPrompt(destination, season);
        String rawOutput = aiProviderRouter.generateText(prompt);
        List<String> items = new ArrayList<>();
        String[] lines = rawOutput.split("\n");
        for (String line : lines) {
            String trimmed = line.replaceAll("^[-*\u2022\\d.]+\\s*", "").trim();
            if (!trimmed.isBlank() && trimmed.length() > 3 && !trimmed.startsWith("#")) {
                items.add(trimmed);
            }
        }
        if (items.isEmpty()) {
            items.addAll(Arrays.asList(
                "Light breathable layers (cotton, linen)",
                "Comfortable walking shoes",
                "Universal power adapter",
                "Hydration bottle",
                "Digital copy of passport & travel insurance",
                "Local currency or travel card",
                "Sunscreen and first aid kit"
            ));
        }
        return items;
    }

    public Map<String, Object> predictCrowdsAndWeather(String destinationId, int daysOffset) {
        String prompt = String.format(
            "Provide a realistic travel prediction for %s, %d days from now. " +
            "Return a JSON object with: crowdIndex (integer 0-100), crowdStatus (string), " +
            "temperature (string like '22 C'), condition (string like 'Partly Sunny'). " +
            "Respond ONLY with raw JSON. No markdown.",
            destinationId, daysOffset
        );
        try {
            String raw = aiProviderRouter.generateText(prompt);
            String cleaned = raw.replaceAll("`json", "").replaceAll("`", "").trim();
            @SuppressWarnings("unchecked")
            Map<String, Object> result = objectMapper.readValue(cleaned, Map.class);
            return result;
        } catch (Exception e) {
            logger.warn("[AiTravelEngine] predictCrowdsAndWeather failed: {}", e.getMessage());
        }
        Map<String, Object> prediction = new HashMap<>();
        prediction.put("crowdIndex", 45);
        prediction.put("crowdStatus", "Moderate Crowds");
        prediction.put("temperature", "22C");
        prediction.put("condition", "Partly Sunny");
        return prediction;
    }

    public List<Map<String, Object>> recommendHiddenGems(String destinationId) {
        String prompt = String.format(
            "Recommend 3 genuine hidden gems (lesser-known places) in or near %s that most tourists miss. " +
            "Return a JSON array where each object has: name (string), description (string, max 100 chars), " +
            "discoveryScore (integer 88-99). " +
            "Respond ONLY with raw JSON array. No markdown. No explanation.",
            destinationId
        );
        try {
            String raw = aiProviderRouter.generateText(prompt);
            String cleaned = raw.replaceAll("`json", "").replaceAll("`", "").trim();
            int start = cleaned.indexOf('[');
            int end = cleaned.lastIndexOf(']');
            if (start >= 0 && end > start) cleaned = cleaned.substring(start, end + 1);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> gems = objectMapper.readValue(cleaned, List.class);
            return gems;
        } catch (Exception e) {
            logger.warn("[AiTravelEngine] recommendHiddenGems failed for {}: {}", destinationId, e.getMessage());
        }
        return List.of(
            createGem("Local Secret Viewpoint", "Panoramic overlook known only to locals — perfect for sunrise.", 93),
            createGem("Hidden Market Quarter", "Artisan stalls and street food away from tourist trails.", 90),
            createGem("Historic Back Alley", "Centuries-old architecture and authentic neighborhood life.", 88)
        );
    }

    private Map<String, Object> createGem(String name, String description, int score) {
        Map<String, Object> gem = new HashMap<>();
        gem.put("name", name);
        gem.put("description", description);
        gem.put("discoveryScore", score);
        return gem;
    }
}
