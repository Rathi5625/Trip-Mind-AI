package com.tripmind.api.controllers;

import com.tripmind.api.services.providers.FlightProvider;
import com.tripmind.api.services.providers.CurrencyProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/intelligence")
public class IntelligenceController {

    private final FlightProvider flightProvider;
    private final CurrencyProvider currencyProvider;

    public IntelligenceController(FlightProvider flightProvider, CurrencyProvider currencyProvider) {
        this.flightProvider = flightProvider;
        this.currencyProvider = currencyProvider;
    }

    @GetMapping("/predict")
    public ResponseEntity<Map<String, Object>> getTravelPredictions(
            @RequestParam("destination") String destination,
            @RequestParam(value = "origin", defaultValue = "DEL") String origin) {
        
        Map<String, Object> prediction = new HashMap<>();
        
        // 1. Flight price forecasting
        Map<String, Object> flights = flightProvider.getPriceForecast(origin, destination);
        prediction.put("flights", flights);

        // 2. Crowd forecast
        Map<String, Object> crowds = new HashMap<>();
        crowds.put("level", "Moderate");
        crowds.put("score", 62);
        crowds.put("advise", "Cheaper hotels and fewer queues expected next week.");
        prediction.put("crowds", crowds);

        // 3. Weather overview
        Map<String, Object> weather = new HashMap<>();
        weather.put("tempMax", "24°C");
        weather.put("tempMin", "18°C");
        weather.put("text", "Sunny");
        prediction.put("weather", weather);

        // 4. Currency rates
        Map<String, Double> rates = currencyProvider.getExchangeRates("USD");
        prediction.put("currencyRates", rates);

        // 5. Visa information
        Map<String, String> visa = new HashMap<>();
        if ("japan".equalsIgnoreCase(destination) || "tokyo".equalsIgnoreCase(destination)) {
            visa.put("requirement", "Visa Required");
            visa.put("processingTime", "5 working days");
            visa.put("details", "E-visa available for tourists from selected nationalities.");
        } else if ("bali".equalsIgnoreCase(destination)) {
            visa.put("requirement", "Visa on Arrival");
            visa.put("processingTime", "Instant");
            visa.put("details", "VoA valid for 30 days, extendable once.");
        } else {
            visa.put("requirement", "Visa Free");
            visa.put("processingTime", "N/A");
            visa.put("details", "Visa-free entry for up to 90 days.");
        }
        prediction.put("visa", visa);

        // 6. Safety Score
        prediction.put("safetyScore", 88);

        // 7. Local Events
        prediction.put("localEvents", List.of(
                Map.of("name", "Local Art & Craft Festival", "date", "Next weekend"),
                Map.of("name", "Gastronomy Food Truck Rally", "date", "In 2 weeks")
        ));

        return ResponseEntity.ok(prediction);
    }
}
