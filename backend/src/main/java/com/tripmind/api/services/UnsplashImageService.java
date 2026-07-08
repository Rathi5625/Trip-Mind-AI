package com.tripmind.api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

/**
 * Fetches high-quality destination photos from Unsplash API.
 * Falls back to a curated placeholder when the key is not yet configured.
 * API Docs: https://unsplash.com/documentation#search-photos
 */
@Service
public class UnsplashImageService {

    private static final Logger logger = LoggerFactory.getLogger(UnsplashImageService.class);

    private final RestTemplate restTemplate;

    @Value("${app.unsplash.access-key:}")
    private String accessKey;

    private static final String UNSPLASH_SEARCH_URL = "https://api.unsplash.com/search/photos";

    // Fallback image for when Unsplash key is not yet configured
    private static final String FALLBACK_IMAGE = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";

    public UnsplashImageService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean isConfigured() {
        return accessKey != null && !accessKey.trim().isEmpty() && !accessKey.equals("your_unsplash_access_key_here");
    }

    /**
     * Returns the best matching Unsplash photo URL for a given destination name.
     * Example: fetchDestinationImage("Tokyo Japan") → full CDN URL
     */
    public String fetchDestinationImage(String destinationName) {
        if (!isConfigured()) {
            logger.warn("[Unsplash] Access key not configured. Returning fallback image.");
            return FALLBACK_IMAGE;
        }

        try {
            String url = UriComponentsBuilder.fromHttpUrl(UNSPLASH_SEARCH_URL)
                    .queryParam("query", destinationName + " travel destination")
                    .queryParam("per_page", 1)
                    .queryParam("orientation", "landscape")
                    .queryParam("content_filter", "high")
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Client-ID " + accessKey);
            headers.set("Accept-Version", "v1");

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            @SuppressWarnings("rawtypes")
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String imageUrl = parseImageUrl(response.getBody());
                if (imageUrl != null) {
                    logger.info("[Unsplash] Fetched image for '{}': {}", destinationName, imageUrl);
                    return imageUrl;
                }
            }
        } catch (Exception e) {
            logger.error("[Unsplash] Failed to fetch image for '{}': {}", destinationName, e.getMessage());
        }

        return FALLBACK_IMAGE;
    }

    @SuppressWarnings("unchecked")
    private String parseImageUrl(Map<?, ?> body) {
        try {
            List<Map<String, Object>> results = (List<Map<String, Object>>) body.get("results");
            if (results != null && !results.isEmpty()) {
                Map<String, Object> firstResult = results.get(0);
                Map<String, Object> urls = (Map<String, Object>) firstResult.get("urls");
                if (urls != null) {
                    // Use 'regular' size (1080px wide) — best for destination cards
                    return (String) urls.get("regular");
                }
            }
        } catch (Exception e) {
            logger.error("[Unsplash] Failed to parse image response: {}", e.getMessage());
        }
        return null;
    }
}
