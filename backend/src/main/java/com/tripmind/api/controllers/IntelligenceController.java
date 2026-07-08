package com.tripmind.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripmind.api.services.ai.AiProviderRouter;
import com.tripmind.api.services.ai.AiTravelEngine;
import com.tripmind.api.services.providers.FlightProvider;
import com.tripmind.api.services.providers.CurrencyProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/intelligence")
public class IntelligenceController {

    private static final Logger logger = LoggerFactory.getLogger(IntelligenceController.class);

    private final FlightProvider flightProvider;
    private final CurrencyProvider currencyProvider;
    private final AiProviderRouter aiProviderRouter;
    private final AiTravelEngine aiTravelEngine;
    private final ObjectMapper objectMapper;

    public IntelligenceController(FlightProvider flightProvider,
                                  CurrencyProvider currencyProvider,
                                  AiProviderRouter aiProviderRouter,
                                  AiTravelEngine aiTravelEngine,
                                  ObjectMapper objectMapper) {
        this.flightProvider = flightProvider;
        this.currencyProvider = currencyProvider;
        this.aiProviderRouter = aiProviderRouter;
        this.aiTravelEngine = aiTravelEngine;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/predict")
    public ResponseEntity<Map<String, Object>> getTravelPredictions(
            @RequestParam("destination") String destination,
            @RequestParam(value = "origin", defaultValue = "DEL") String origin) {

        Map<String, Object> prediction = new HashMap<>();

        // 1. Flight price forecasting
        Map<String, Object> flights = flightProvider.getPriceForecast(origin, destination);
        prediction.put("flights", flights);

        // 2. Crowd & weather via AI
        Map<String, Object> crowds = aiTravelEngine.predictCrowdsAndWeather(destination, 3);
        prediction.put("crowds", Map.of(
            "level", crowds.getOrDefault("crowdStatus", "Moderate"),
            "score", crowds.getOrDefault("crowdIndex", 50),
            "advise", "Check Tavily research for real-time crowd advisories.",
            "temperature", crowds.getOrDefault("temperature", "22Â°C"),
            "condition", crowds.getOrDefault("condition", "Partly Sunny")
        ));

        // 3. Currency rates
        Map<String, Double> rates = currencyProvider.getExchangeRates("USD");
        prediction.put("currencyRates", rates);

        // 4. AI-generated visa information (dynamic, not hardcoded)
        String visaPrompt = String.format(
            "Provide visa requirements for Indian passport holders visiting %s. " +
            "Return a JSON object with these exact keys: requirement (string), " +
            "processingTime (string), details (string, max 120 chars). " +
            "Respond ONLY with raw JSON. No markdown.",
            destination
        );
        Map<String, String> visa = new LinkedHashMap<>();
        try {
            String raw = aiProviderRouter.generateText(visaPrompt);
            String cleaned = raw.replaceAll("```json", "").replaceAll("```", "").trim();
            int start = cleaned.indexOf('{');
            int end = cleaned.lastIndexOf('}');
            if (start >= 0 && end > start) cleaned = cleaned.substring(start, end + 1);
            @SuppressWarnings("unchecked")
            Map<String, String> parsed = objectMapper.readValue(cleaned, Map.class);
            visa.putAll(parsed);
        } catch (Exception e) {
            logger.warn("[Intelligence] AI visa lookup failed for {}: {}", destination, e.getMessage());
            visa.put("requirement", "Check with embassy");
            visa.put("processingTime", "Varies");
            visa.put("details", "Please verify visa requirements with the official embassy before travelling.");
        }
        prediction.put("visa", visa);

        // 5. AI Safety Score
        String safetyPrompt = String.format(
            "Rate the safety of %s for tourists on a scale of 0-100. " +
            "Return ONLY a JSON object with: safetyScore (integer), safetyLevel (string like 'Very Safe'). No markdown.",
            destination
        );
        int safetyScore = 80;
        String safetyLevel = "Safe";
        try {
            String raw = aiProviderRouter.generateText(safetyPrompt);
            String cleaned = raw.replaceAll("```json", "").replaceAll("```", "").trim();
            int start = cleaned.indexOf('{');
            int end = cleaned.lastIndexOf('}');
            if (start >= 0 && end > start) cleaned = cleaned.substring(start, end + 1);
            @SuppressWarnings("unchecked")
            Map<String, Object> parsed = objectMapper.readValue(cleaned, Map.class);
            safetyScore = ((Number) parsed.getOrDefault("safetyScore", 80)).intValue();
            safetyLevel = (String) parsed.getOrDefault("safetyLevel", "Safe");
        } catch (Exception e) {
            logger.warn("[Intelligence] AI safety lookup failed for {}: {}", destination, e.getMessage());
        }
        prediction.put("safetyScore", safetyScore);
        prediction.put("safetyLevel", safetyLevel);

        // 6. AI-generated local events
        String eventsPrompt = String.format(
            "List 2 upcoming local events or festivals happening in %s in the next 30 days. " +
            "Return a JSON array where each item has: name (string), date (string). No markdown.",
            destination
        );
        List<?> localEvents = List.of(
            Map.of("name", "Local Cultural Festival", "date", "This month"),
            Map.of("name", "Food & Artisan Market", "date", "Next weekend")
        );
        try {
            String raw = aiProviderRouter.generateText(eventsPrompt);
            String cleaned = raw.replaceAll("```json", "").replaceAll("```", "").trim();
            int start = cleaned.indexOf('[');
            int end = cleaned.lastIndexOf(']');
            if (start >= 0 && end > start) cleaned = cleaned.substring(start, end + 1);
            localEvents = objectMapper.readValue(cleaned, List.class);
        } catch (Exception e) {
            logger.warn("[Intelligence] AI events lookup failed for {}: {}", destination, e.getMessage());
        }
        prediction.put("localEvents", localEvents);

        return ResponseEntity.ok(prediction);
    }
}

