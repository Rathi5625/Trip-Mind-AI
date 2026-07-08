package com.tripmind.api.services.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service to generate dynamic destination images using NVIDIA's API Catalog.
 * Utilizes the high-quality Black Forest Labs FLUX.1-schnell model.
 */
@Service
public class NvidiaImageService {

    private static final Logger logger = LoggerFactory.getLogger(NvidiaImageService.class);

    private final RestTemplate restTemplate;

    @Value("${app.nvidia.api-key:}")
    private String apiKey;

    @Value("${app.nvidia.image-api-key:}")
    private String imageApiKey;

    private String getActiveKey() {
        if (imageApiKey != null && !imageApiKey.trim().isEmpty() && !imageApiKey.contains("your_nvidia_image_api_key_here")) {
            return imageApiKey;
        }
        return apiKey;
    }

    private static final String NVIDIA_IMAGE_URL = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux-1-schnell";

    // Simple in-memory cache to prevent redundant model runs for identical queries
    private final Map<String, byte[]> imageCache = new ConcurrentHashMap<>();

    public NvidiaImageService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean isConfigured() {
        String activeKey = getActiveKey();
        return activeKey != null && !activeKey.trim().isEmpty() && !activeKey.contains("your_nvidia");
    }

    /**
     * Generates a travel destination image based on a query prompt.
     * Returns raw JPEG/PNG byte array, or null if generation fails.
     */
    public byte[] generateImage(String query) {
        String cacheKey = query.trim().toLowerCase();
        if (imageCache.containsKey(cacheKey)) {
            logger.info("[NVIDIA Image] Cache hit for query: {}", query);
            return imageCache.get(cacheKey);
        }

        if (!isConfigured()) {
            logger.warn("[NVIDIA Image] API key is not configured.");
            return null;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(getActiveKey());
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            Map<String, Object> requestBody = new LinkedHashMap<>();
            requestBody.put("prompt", "Beautiful travel destination photo of " + query + ", award winning travel photography, detailed, 8k resolution, photorealistic");
            requestBody.put("aspect_ratio", "16:9");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            @SuppressWarnings("rawtypes")
            ResponseEntity<Map> response = restTemplate.postForEntity(NVIDIA_IMAGE_URL, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                byte[] imgBytes = parseImageResponse(response.getBody());
                if (imgBytes != null && imgBytes.length > 0) {
                    logger.info("[NVIDIA Image] Generated image for '{}' successfully.", query);
                    imageCache.put(cacheKey, imgBytes);
                    return imgBytes;
                }
            }
        } catch (Exception e) {
            logger.error("[NVIDIA Image] Image generation failed for '{}': {}", query, e.getMessage());
        }

        return null;
    }

    @SuppressWarnings("unchecked")
    private byte[] parseImageResponse(Map<?, ?> body) {
        try {
            List<Map<String, Object>> artifacts = (List<Map<String, Object>>) body.get("artifacts");
            if (artifacts != null && !artifacts.isEmpty()) {
                Map<String, Object> firstArtifact = artifacts.get(0);
                String base64Data = (String) firstArtifact.get("base64");
                if (base64Data != null) {
                    return Base64.getDecoder().decode(base64Data);
                }
            }
        } catch (Exception e) {
            logger.error("[NVIDIA Image] Failed to parse image base64 response: {}", e.getMessage());
        }
        return null;
    }
}
