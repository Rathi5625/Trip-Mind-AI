package com.tripmind.api.controllers;

import com.tripmind.api.entities.Attraction;
import com.tripmind.api.services.AttractionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attractions")
public class AttractionController {

    private final AttractionService attractionService;

    public AttractionController(AttractionService attractionService) {
        this.attractionService = attractionService;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<List<Attraction>> getAttractionsByDestination(@PathVariable String destinationId) {
        List<Attraction> response = attractionService.getAttractionsByDestination(destinationId);
        return ResponseEntity.ok(response);
    }
}
