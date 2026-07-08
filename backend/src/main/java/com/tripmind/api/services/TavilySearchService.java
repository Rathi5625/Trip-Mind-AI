package com.tripmind.api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * Performs real-time web searches via Tavily AI Search API.
 * Used by AiChatController to give the AI copilot up-to-date, factual answers
 * instead of relying solely on the model's training data.
 * API Docs: https://docs.tavily.com/docs/rest-api/api-reference
 */
@Service
public class TavilySearchService {

    private static final Logger logger = LoggerFactory.getLogger(TavilySearchService.class);

    private final RestTemplate restTemplate;

    @Value("${app.tavily.api-key:}")
    private String apiKey;

    private static final String TAVILY_SEARCH_URL = "https://api.tavily.com/search";

    public TavilySearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.trim().isEmpty() && !apiKey.equals("your_tavily_api_key_here");
    }

    /**
     * Searches the web for the given query and returns a concise summary string
     * that can be injected into the AI prompt as context.
     *
     * @param query The user's question (e.g. "visa requirements for Japan 2025")
     * @return A formatted string of web research results, or null if unavailable.
     */
    public String search(String query) {
        if (!isConfigured()) {
            logger.warn("[Tavily] API key not configured. Skipping web research.");
            return null;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new LinkedHashMap<>();
            requestBody.put("api_key", apiKey);
            requestBody.put("query", query);
            requestBody.put("search_depth", "advanced");      // thorough results
            requestBody.put("include_answer", true);          // Tavily's own summary
            requestBody.put("include_raw_content", false);
            requestBody.put("max_results", 5);
            requestBody.put("include_domains", List.of());    // all domains
            requestBody.put("exclude_domains", List.of());

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            @SuppressWarnings("rawtypes")
            ResponseEntity<Map> response = restTemplate.postForEntity(TAVILY_SEARCH_URL, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String context = buildContext(response.getBody(), query);
                logger.info("[Tavily] Successfully retrieved web research for: {}", query);
                return context;
            }

        } catch (Exception e) {
            logger.error("[Tavily] Search failed for '{}': {}", query, e.getMessage());
        }

        return null;
    }

    @SuppressWarnings("unchecked")
    private String buildContext(Map<?, ?> body, String query) {
        StringBuilder sb = new StringBuilder();
        sb.append("=== REAL-TIME WEB RESEARCH RESULTS ===\n");
        sb.append("Query: ").append(query).append("\n\n");

        // Include Tavily's own AI-generated answer if present
        String answer = (String) body.get("answer");
        if (answer != null && !answer.isBlank()) {
            sb.append("Summary: ").append(answer).append("\n\n");
        }

        // Include top search results as supporting evidence
        List<Map<String, Object>> results = (List<Map<String, Object>>) body.get("results");
        if (results != null) {
            sb.append("Sources:\n");
            for (int i = 0; i < Math.min(results.size(), 3); i++) {
                Map<String, Object> r = results.get(i);
                String title = (String) r.getOrDefault("title", "");
                String content = (String) r.getOrDefault("content", "");
                String url = (String) r.getOrDefault("url", "");
                sb.append(i + 1).append(". ").append(title).append("\n");
                if (!content.isBlank()) {
                    // Trim content to first 300 chars to save tokens
                    sb.append("   ").append(content.substring(0, Math.min(content.length(), 300))).append("...\n");
                }
                if (!url.isBlank()) {
                    sb.append("   Source: ").append(url).append("\n");
                }
                sb.append("\n");
            }
        }

        sb.append("=== END OF WEB RESEARCH ===\n");
        return sb.toString();
    }
}
