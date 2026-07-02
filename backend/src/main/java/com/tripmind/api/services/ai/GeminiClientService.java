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
        String query = prompt.toLowerCase();
        if (query.contains("tokyo") || query.contains("japan")) {
            return "### Fallback AI Output: Tokyo Highlights\n- Visit Shibuya Crossing at 09:00 AM\n- Sushi lunch in Tsukiji Market\n- Evening sunset at Tokyo Skytree.";
        }
        if (query.contains("swiss") || query.contains("swiss alps") || query.contains("switzerland")) {
            return "### Fallback AI Output: Swiss Alps Highlights\n- Board Lake Lucerne steamer at 09:30 AM\n- Mountain sledding at Mt. Pilatus\n- Traditional cheese fondue dinner.";
        }
        return "### Fallback AI Travel Guide\n- Explore local markets and sights\n- Try traditional street food\n- Take scenic walking routes.";
    }
}
