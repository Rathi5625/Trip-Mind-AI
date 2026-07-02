package com.tripmind.api.controllers;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsDashboardResponse> getAnalyticsDashboard() {
        AnalyticsDashboardResponse response = AnalyticsDashboardResponse.builder()
                .activeUsers(1420)
                .totalTripsCreated(4850)
                .revenueGraph(Map.of(
                        "Jan", 12000.0,
                        "Feb", 18500.0,
                        "Mar", 22000.0,
                        "Apr", 28000.0
                ))
                .popularDestinations(List.of("Tokyo", "Paris", "Bali"))
                .aiResponseTimeMs(480)
                .build();

        return ResponseEntity.ok(response);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnalyticsDashboardResponse {
        private int activeUsers;
        private int totalTripsCreated;
        private Map<String, Double> revenueGraph;
        private List<String> popularDestinations;
        private long aiResponseTimeMs;
    }
}
