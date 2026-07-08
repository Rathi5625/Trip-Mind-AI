package com.tripmind.api.services.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class GeminiClientService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiClientService.class);

    private final RestTemplate restTemplate;

    @Value("${app.gemini.api-key:DEMO_KEY}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

    public GeminiClientService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateText(String prompt) {
        if ("DEMO_KEY".equals(apiKey) || apiKey.trim().isEmpty()) {
            logger.warn("Gemini API key is not configured. Returning fallback mock response.");
            return getFallbackResponse(prompt);
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct Gemini Request Body
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> contentMap = new HashMap<>();
            List<Map<String, String>> parts = new ArrayList<>();
            Map<String, String> partMap = new HashMap<>();
            
            partMap.put("text", prompt);
            parts.add(partMap);
            contentMap.put("parts", parts);
            contents.add(contentMap);
            requestBody.put("contents", contents);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    GEMINI_API_URL + apiKey,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return parseGeminiResponse(response.getBody());
            }

        } catch (Exception e) {
            logger.error("Error communicating with Gemini API, returning fallback: {}", e.getMessage());
        }

        return getFallbackResponse(prompt);
    }

    @SuppressWarnings("unchecked")
    private String parseGeminiResponse(Map responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> firstCandidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                if (content != null) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Failed to parse Gemini response: {}", e.getMessage());
        }
        return "Failed to parse AI output.";
    }

    private String getFallbackResponse(String prompt) {
        // No hardcoded responses — return a graceful message that the AI is temporarily unavailable.
        // The router will already have tried all providers before reaching this point.
        return "I'm currently unable to connect to the AI service. Please check your API key configuration " +
               "or try again in a moment. If you need immediate help, contact support.";
    }
}
