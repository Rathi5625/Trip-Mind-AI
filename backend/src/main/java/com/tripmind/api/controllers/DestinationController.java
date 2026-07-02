package com.tripmind.api.controllers;

import com.tripmind.api.dtos.DestinationDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public ResponseEntity<List<DestinationDto>> getDestinations(
            @RequestParam(value = "q", required = false) String query,
            @RequestParam(value = "cat", required = false) String category) {
        if (query != null && !query.trim().isEmpty()) {
            return ResponseEntity.ok(destinationService.searchDestinations(query));
        }
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(destinationService.getDestinationsByCategory(category));
        }
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationDto> getDestinationById(@PathVariable String id) {
        DestinationDto response = destinationService.getDestinationById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/wishlist")
    public ResponseEntity<Boolean> toggleWishlist(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String id) {
        boolean response = destinationService.toggleWishlist(userPrincipal.getId(), id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<DestinationDto>> getUserWishlist(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<DestinationDto> response = destinationService.getUserWishlist(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }
}
