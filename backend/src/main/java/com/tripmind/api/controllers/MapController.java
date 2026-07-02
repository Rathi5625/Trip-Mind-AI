package com.tripmind.api.controllers;

import com.tripmind.api.services.MapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/map")
public class MapController {

    private final MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<Map<String, Object>> getMapDetails(@PathVariable String destinationId) {
        Map<String, Object> response = mapService.getMapLayerDetails(destinationId);
        return ResponseEntity.ok(response);
    }
}
