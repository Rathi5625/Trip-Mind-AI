package com.tripmind.api.services;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class MapService {

    public Map<String, Object> getMapLayerDetails(String destinationId) {
        Map<String, Object> details = new HashMap<>();
        details.put("destination", destinationId);
        
        // Define coordinates mapping for fly-to actions
        Map<String, Double> coords = new HashMap<>();
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
