package com.tripmind.api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MapService {

    private static final Logger logger = LoggerFactory.getLogger(MapService.class);
    private final RestTemplate restTemplate;

    public MapService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getMapLayerDetails(String destinationId) {
        Map<String, Object> details = new HashMap<>();
        details.put("destination", destinationId);
        
        Map<String, Double> coords = new HashMap<>();
        try {
            String url = "https://nominatim.openstreetmap.org/search?q=" + destinationId + "&format=json&limit=1";
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "TripMindAI/1.0");
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);
            
            if (response.getBody() != null && !response.getBody().isEmpty()) {
                Map<String, Object> result = (Map<String, Object>) response.getBody().get(0);
                double lat = Double.parseDouble(result.get("lat").toString());
                double lon = Double.parseDouble(result.get("lon").toString());
                coords.put("lng", lon);
                coords.put("lat", lat);
                details.put("center", coords);
                details.put("zoom", 11);
                return details;
            }
        } catch (Exception e) {
            logger.error("Failed to fetch geocoding from Nominatim: {}, using fallback coordinates", e.getMessage());
        }

        // Fallback Coordinates Mapping
        if ("tokyo".equalsIgnoreCase(destinationId)) {
            coords.put("lng", 139.6917);
            coords.put("lat", 35.6895);
        } else if ("bali".equalsIgnoreCase(destinationId)) {
            coords.put("lng", 115.1889);
            coords.put("lat", -8.4095);
        } else if ("switzerland".equalsIgnoreCase(destinationId)) {
            coords.put("lng", 8.2275);
            coords.put("lat", 46.8182);
        } else {
            coords.put("lng", 2.3522);
            coords.put("lat", 48.8566); // Default: Paris
        }
        
        details.put("center", coords);
        details.put("zoom", 11);
        return details;
    }
}
