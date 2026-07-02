package com.tripmind.api.services.ai;

import com.tripmind.api.dtos.DestinationDto;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AiTravelEngine {

    private final GeminiClientService geminiClientService;

    public AiTravelEngine(GeminiClientService geminiClientService) {
        this.geminiClientService = geminiClientService;
    }

    public Map<String, Object> analyzeTravelStyle(List<String> travelerTypes, String pacePreference) {
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("style", travelerTypes.isEmpty() ? "Cultural Explorer" : travelerTypes.get(0));
        analysis.put("pace", pacePreference);
        analysis.put("dnaMatch", 94);
        analysis.put("insights", List.of(
                "You prefer a " + pacePreference + " journey focusing on deep cultural immersions.",
                "Recommended focus areas: Local gastronomy, historic quarters, and walking explorations."
        ));
        return analysis;
    }

    public List<String> generatePackingList(String destination, String season) {
        String prompt = PromptTemplates.getPackingRecommendationPrompt(destination, season);
        String rawOutput = geminiClientService.generateText(prompt);
        
        List<String> items = new ArrayList<>();
        if (rawOutput.contains("###")) {
            // Basic parsing of lines
            String[] lines = rawOutput.split("\n");
            for (String line : lines) {
                if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
                    items.add(line.replace("-", "").replace("*", "").trim());
                }
            }
        }
        
        if (items.isEmpty()) {
            items.addAll(Arrays.asList(
                    "Light breathable layers (cotton, linen)",
                    "Comfortable urban walking sneakers",
                    "Universal power adapter",
                    "Hydration pack or reusable bottle",
                    "Digital copy of passport & travel insurance"
            ));
        }
        return items;
    }

    public Map<String, Object> predictCrowdsAndWeather(String destinationId, int daysOffset) {
        Map<String, Object> prediction = new HashMap<>();
        
        // Simulating predictions
        int crowdIndex = 30 + (daysOffset * 5) % 65;
        String status = crowdIndex > 75 ? "Peak Crowds" : crowdIndex > 45 ? "Moderate Crowds" : "Least Crowded";
        
        prediction.put("crowdIndex", crowdIndex);
        prediction.put("crowdStatus", status);
        prediction.put("temperature", (16 + (daysOffset % 12)) + "°C");
        prediction.put("condition", daysOffset % 5 == 0 ? "Scattered Showers" : "Partly Sunny");
        
        return prediction;
    }

    public List<Map<String, Object>> recommendHiddenGems(String destinationId) {
        List<Map<String, Object>> gems = new ArrayList<>();
        
        if ("bali".equalsIgnoreCase(destinationId)) {
            gems.add(createGem("Secret Leke Leke Waterfall", "Hidden jungle waterfall with absolute serenity.", 96));
            gems.add(createGem("Sidemen Valley", "Traditional terraces completely untouched by main tourism.", 94));
        } else if ("tokyo".equalsIgnoreCase(destinationId)) {
            gems.add(createGem("Todoroki Valley", "A lush forested valley hidden in the middle of Tokyo.", 97));
            gems.add(createGem("Yanaka Neighborhood", "Historic retro streets retaining old Tokyo vibes.", 93));
        } else {
            gems.add(createGem("Local Secret Overlook", "Lesser-known panoramic viewpoint popular with local photographers.", 92));
            gems.add(createGem("Hidden Artisan Alley", "Tucked-away market stalls featuring handmade crafts.", 90));
        }
        return gems;
    }

    private Map<String, Object> createGem(String name, String description, int score) {
        Map<String, Object> gem = new HashMap<>();
        gem.put("name", name);
        gem.put("description", description);
        gem.put("discoveryScore", score);
        return gem;
    }
}
