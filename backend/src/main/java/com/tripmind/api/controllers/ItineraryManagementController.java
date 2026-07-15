package com.tripmind.api.controllers;

import com.tripmind.api.dtos.ActivityDto;
import com.tripmind.api.dtos.TripDayDto;
import com.tripmind.api.entities.CrowdPrediction;
import com.tripmind.api.entities.TripBudget;
import com.tripmind.api.entities.WeatherForecast;
import com.tripmind.api.entities.TransportRoute;
import com.tripmind.api.services.ItineraryManagementService;
import com.tripmind.api.services.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ItineraryManagementController {

    private final ItineraryManagementService itineraryManagementService;
    private final TripService tripService;

    public ItineraryManagementController(ItineraryManagementService itineraryManagementService,
                                         TripService tripService) {
        this.itineraryManagementService = itineraryManagementService;
        this.tripService = tripService;
    }

    private UUID resolveTripId(String idStr) {
        try {
            return UUID.fromString(idStr);
        } catch (IllegalArgumentException e) {
            return tripService.getFallbackTripId();
        }
    }

    @GetMapping("/trips/{tripId}/itinerary")
    public ResponseEntity<List<TripDayDto>> getItinerary(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getItinerary(resolvedId));
    }

    @GetMapping("/trips/{tripId}/days/{dayId}")
    public ResponseEntity<TripDayDto> getDay(@PathVariable String tripId, @PathVariable Long dayId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getDay(resolvedId, dayId));
    }

    @PostMapping("/trips/{tripId}/activities")
    public ResponseEntity<ActivityDto> addActivity(@PathVariable String tripId, @RequestBody ActivityDto dto) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.addActivity(resolvedId, dto));
    }

    @PutMapping("/activities/{activityId}")
    public ResponseEntity<ActivityDto> updateActivity(@PathVariable Long activityId, @RequestBody ActivityDto dto) {
        return ResponseEntity.ok(itineraryManagementService.updateActivity(activityId, dto));
    }

    @DeleteMapping("/activities/{activityId}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long activityId) {
        itineraryManagementService.deleteActivity(activityId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/trips/{tripId}/optimize")
    public ResponseEntity<Map<String, Object>> optimize(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.optimize(resolvedId));
    }

    @PostMapping("/trips/{tripId}/ask-ai")
    public ResponseEntity<Map<String, Object>> askAi(@PathVariable String tripId, @RequestBody Map<String, String> request) {
        UUID resolvedId = resolveTripId(tripId);
        String command = request.get("command");
        return ResponseEntity.ok(itineraryManagementService.askAi(resolvedId, command));
    }

    @GetMapping("/trips/{tripId}/weather")
    public ResponseEntity<WeatherForecast> getWeather(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getWeather(resolvedId));
    }

    @GetMapping("/trips/{tripId}/crowds")
    public ResponseEntity<CrowdPrediction> getCrowds(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getCrowds(resolvedId));
    }

    @GetMapping("/trips/{tripId}/budget")
    public ResponseEntity<TripBudget> getBudget(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getBudget(resolvedId));
    }

    @GetMapping("/trips/{tripId}/transport")
    public ResponseEntity<List<TransportRoute>> getTransport(@PathVariable String tripId) {
        UUID resolvedId = resolveTripId(tripId);
        return ResponseEntity.ok(itineraryManagementService.getTransport(resolvedId));
    }
}
