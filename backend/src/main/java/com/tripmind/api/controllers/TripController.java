package com.tripmind.api.controllers;

import com.tripmind.api.dtos.TripDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;
    private final com.tripmind.api.services.ai.ItineraryGeneratorService itineraryGeneratorService;

    public TripController(TripService tripService,
                          com.tripmind.api.services.ai.ItineraryGeneratorService itineraryGeneratorService) {
        this.tripService = tripService;
        this.itineraryGeneratorService = itineraryGeneratorService;
    }

    @GetMapping
    public ResponseEntity<List<TripDto>> getUserTrips(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<TripDto> response = tripService.getTripsByUserId(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable UUID id) {
        TripDto response = tripService.getTripById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(
             @AuthenticationPrincipal UserPrincipal userPrincipal,
             @RequestBody TripDto tripDto,
             @RequestParam(value = "ai", defaultValue = "false") boolean triggerAi) {
        TripDto response = tripService.createTrip(userPrincipal.getId(), tripDto, triggerAi);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable UUID id, @RequestBody TripDto tripDto) {
        TripDto response = tripService.updateTrip(id, tripDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable UUID id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/replace-activity")
    public ResponseEntity<TripDto> replaceActivity(
            @PathVariable UUID id,
            @RequestParam("dayId") Long dayId,
            @RequestParam("transportId") Long transportId,
            @RequestParam("type") String type,
            @RequestParam("destination") String destination) {
        TripDto response = itineraryGeneratorService.replaceActivity(id, dayId, transportId, type, destination);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/optimize-route")
    public ResponseEntity<TripDto> optimizeRoute(@PathVariable UUID id) {
        TripDto response = itineraryGeneratorService.optimizeRoute(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/modify-length")
    public ResponseEntity<TripDto> modifyLength(
            @PathVariable UUID id,
            @RequestParam("days") int days) {
        TripDto response = itineraryGeneratorService.modifyTripLength(id, days);
        return ResponseEntity.ok(response);
    }
}
