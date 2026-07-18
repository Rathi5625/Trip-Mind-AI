package com.tripmind.api.controllers;

import com.tripmind.api.entities.User;
import com.tripmind.api.repositories.UserRepository;
import com.tripmind.api.services.MapService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/map")
public class MapController {

    private final MapService mapService;
    private final UserRepository userRepository;

    public MapController(MapService mapService, UserRepository userRepository) {
        this.mapService = mapService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<Map<String, Object>> getMapDetails(@PathVariable String destinationId) {
        Map<String, Object> response = mapService.getDestinationMapDetails(destinationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<Map<String, Object>> getDestinationMapDetails(@PathVariable String destinationId) {
        Map<String, Object> response = mapService.getDestinationMapDetails(destinationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<Map<String, Object>> getTripMapDetails(@PathVariable String tripId) {
        UUID uuid;
        try {
            uuid = UUID.fromString(tripId);
        } catch (IllegalArgumentException e) {
            // Return empty fallback map structure
            return ResponseEntity.badRequest().build();
        }
        Map<String, Object> response = mapService.getTripMapDetails(uuid);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-trips")
    public ResponseEntity<List<Map<String, Object>>> getUserTripsMap(Authentication authentication) {
        User user = null;
        if (authentication != null && authentication.getName() != null) {
            user = userRepository.findByEmail(authentication.getName()).orElse(null);
        }
        List<Map<String, Object>> pins = mapService.getUserTripsMapPins(user);
        return ResponseEntity.ok(pins);
    }
}
