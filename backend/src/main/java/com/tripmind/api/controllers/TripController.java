package com.tripmind.api.controllers;

import com.tripmind.api.dtos.TripDto;
import com.tripmind.api.dtos.TripDayDto;
import com.tripmind.api.dtos.BookingDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.TripService;
import com.tripmind.api.services.WorkspaceService;
import com.tripmind.api.entities.TripProgress;
import com.tripmind.api.entities.TripAiForecast;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;
    private final WorkspaceService workspaceService;
    private final com.tripmind.api.services.ai.ItineraryGeneratorService itineraryGeneratorService;

    public TripController(TripService tripService,
                          WorkspaceService workspaceService,
                          com.tripmind.api.services.ai.ItineraryGeneratorService itineraryGeneratorService) {
        this.tripService = tripService;
        this.workspaceService = workspaceService;
        this.itineraryGeneratorService = itineraryGeneratorService;
    }

    private UUID resolveTripId(String idStr) {
        try {
            return UUID.fromString(idStr);
        } catch (IllegalArgumentException e) {
            return tripService.getFallbackTripId();
        }
    }

    @GetMapping
    public ResponseEntity<List<TripDto>> getUserTrips(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<TripDto> response = tripService.getTripsByUserId(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        workspaceService.ensureSeeded(resolvedId);
        TripDto response = tripService.getTripById(resolvedId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(
             @AuthenticationPrincipal UserPrincipal userPrincipal,
             @Valid @RequestBody TripDto tripDto,
             @RequestParam(value = "ai", defaultValue = "false") boolean triggerAi) {
        TripDto response = tripService.createTrip(userPrincipal.getId(), tripDto, triggerAi);
        workspaceService.ensureSeeded(response.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable String id, @Valid @RequestBody TripDto tripDto) {
        UUID resolvedId = resolveTripId(id);
        TripDto response = tripService.updateTrip(resolvedId, tripDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        tripService.deleteTrip(resolvedId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/replace-activity")
    public ResponseEntity<TripDto> replaceActivity(
            @PathVariable String id,
            @RequestParam("dayId") Long dayId,
            @RequestParam("transportId") Long transportId,
            @RequestParam("type") String type,
            @RequestParam("destination") String destination) {
        UUID resolvedId = resolveTripId(id);
        TripDto response = itineraryGeneratorService.replaceActivity(resolvedId, dayId, transportId, type, destination);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/optimize-route")
    public ResponseEntity<TripDto> optimizeRoute(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        TripDto response = itineraryGeneratorService.optimizeRoute(resolvedId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/modify-length")
    public ResponseEntity<TripDto> modifyLength(
            @PathVariable String id,
            @RequestParam("days") int days) {
        UUID resolvedId = resolveTripId(id);
        TripDto response = itineraryGeneratorService.modifyTripLength(resolvedId, days);
        return ResponseEntity.ok(response);
    }

    // Workspace overview endpoint
    @GetMapping("/{id}/overview")
    public ResponseEntity<Map<String, Object>> getWorkspaceOverview(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getOverview(resolvedId));
    }

    // Workspace timeline/itinerary endpoint
    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<TripDayDto>> getWorkspaceTimeline(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getTimeline(resolvedId));
    }

    // Workspace progress endpoint
    @GetMapping("/{id}/progress")
    public ResponseEntity<TripProgress> getWorkspaceProgress(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getProgress(resolvedId));
    }

    // Workspace forecast endpoint
    @GetMapping("/{id}/forecast")
    public ResponseEntity<List<TripAiForecast>> getWorkspaceForecast(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getForecast(resolvedId));
    }

    // Workspace bookings endpoint
    @GetMapping("/{id}/bookings")
    public ResponseEntity<List<BookingDto>> getWorkspaceBookings(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getBookings(resolvedId));
    }

    // Workspace analytics endpoint
    @GetMapping("/{id}/analytics")
    public ResponseEntity<Map<String, Object>> getWorkspaceAnalytics(@PathVariable String id) {
        UUID resolvedId = resolveTripId(id);
        return ResponseEntity.ok(workspaceService.getAnalytics(resolvedId));
    }
}
