package com.tripmind.api.services.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * Client service for NVIDIA's AI API Catalog.
 * Uses the OpenAI-compatible chat completions endpoint to call Nemotron Ultra.
 * API Docs: https://build.nvidia.com/nvidia/llama-3_1-nemotron-ultra-253b-v1
 */
@Service
public class NvidiaClientService {

    private static final Logger logger = LoggerFactory.getLogger(NvidiaClientService.class);

    private final RestTemplate restTemplate;

    @Value("${app.nvidia.api-key:}")
    private String apiKey;

    // NVIDIA API Catalog — OpenAI-compatible endpoint
    private static final String NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

    // Llama 3.1 70B Instruct — Active, highly capable reasoning model
    private static final String MODEL = "meta/llama-3.1-70b-instruct";

    public NvidiaClientService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.trim().isEmpty();
    }

    /**
     * Sends a prompt to NVIDIA Nemotron Ultra and returns the text response.
     * Returns null on failure — signals the AiProviderRouter to fall back to Gemini.
     */
    public String generateText(String prompt) {
        if (!isConfigured()) {
            logger.warn("[NVIDIA] API key not configured, skipping NVIDIA provider.");
            return null;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            // OpenAI-compatible chat completions request body
            Map<String, Object> requestBody = new LinkedHashMap<>();
            requestBody.put("model", MODEL);

            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> systemMessage = new LinkedHashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content",
                    "You are an expert AI travel planner assistant. " +
                    "You provide highly detailed, personalized, and accurate travel recommendations. " +
                    "When asked for JSON output, respond ONLY with valid raw JSON — no markdown, no explanation.");
            messages.add(systemMessage);

            Map<String, String> userMessage = new LinkedHashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);
            messages.add(userMessage);

            requestBody.put("messages", messages);
            requestBody.put("temperature", 0.6);
            requestBody.put("top_p", 0.95);
            requestBody.put("max_tokens", 4096);
            requestBody.put("stream", false);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            @SuppressWarnings("rawtypes")
            ResponseEntity<Map> response = restTemplate.postForEntity(NVIDIA_API_URL, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String result = parseResponse(response.getBody());
                if (result != null) {
                    logger.info("[NVIDIA] Successfully generated response via Nemotron Ultra.");
                    return result;
                }
            }

        } catch (Exception e) {
            logger.error("[NVIDIA] Error communicating with NVIDIA API: {}", e.getMessage());
        }

        return null; // Signal to AiProviderRouter to fall back to Gemini
    }

    @SuppressWarnings("unchecked")
    private String parseResponse(Map<?, ?> responseBody) {
        try {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> firstChoice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
                if (message != null) {
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            logger.error("[NVIDIA] Failed to parse NVIDIA response: {}", e.getMessage());
        }
        return null;
    }
}
