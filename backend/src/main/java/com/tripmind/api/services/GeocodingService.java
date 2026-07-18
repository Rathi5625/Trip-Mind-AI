package com.tripmind.api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    private static final Logger logger = LoggerFactory.getLogger(GeocodingService.class);
    private final RestTemplate restTemplate;

    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Resolve latitude and longitude for a given location query string.
     * Uses OpenStreetMap Nominatim with Photon fallback.
     * Returns double[] { lat, lng } or null if unresolvable.
     */
    public double[] geocodeQuery(String query) {
        if (query == null || query.trim().isEmpty()) {
            return null;
        }

        String cleanedQuery = query.trim();

        // 1. Primary: Nominatim API
        try {
            String encodedQuery = URLEncoder.encode(cleanedQuery, StandardCharsets.UTF_8);
            String url = "https://nominatim.openstreetmap.org/search?q=" + encodedQuery + "&format=json&limit=1";

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "TripMindAI/1.0 (travel-planning-app)");
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);

            if (response.getBody() != null && !response.getBody().isEmpty()) {
                Map<String, Object> result = (Map<String, Object>) response.getBody().get(0);
                double lat = Double.parseDouble(result.get("lat").toString());
                double lon = Double.parseDouble(result.get("lon").toString());
                logger.info("Geocoded query [{}] via Nominatim -> lat: {}, lon: {}", cleanedQuery, lat, lon);
                return new double[]{lat, lon};
            }
        } catch (Exception e) {
            logger.warn("Nominatim geocoding failed for [{}]: {}", cleanedQuery, e.getMessage());
        }

        // 2. Fallback: Photon API
        try {
            String encodedQuery = URLEncoder.encode(cleanedQuery, StandardCharsets.UTF_8);
            String url = "https://photon.komoot.io/api/?q=" + encodedQuery + "&limit=1";

            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            if (response.getBody() != null && response.getBody().containsKey("features")) {
                List features = (List) response.getBody().get("features");
                if (features != null && !features.isEmpty()) {
                    Map first = (Map) features.get(0);
                    Map geometry = (Map) first.get("geometry");
                    List coordinates = (List) geometry.get("coordinates");
                    double lon = Double.parseDouble(coordinates.get(0).toString());
                    double lat = Double.parseDouble(coordinates.get(1).toString());
                    logger.info("Geocoded query [{}] via Photon -> lat: {}, lon: {}", cleanedQuery, lat, lon);
                    return new double[]{lat, lon};
                }
            }
        } catch (Exception e) {
            logger.warn("Photon fallback geocoding failed for [{}]: {}", cleanedQuery, e.getMessage());
        }

        return null;
    }
}
