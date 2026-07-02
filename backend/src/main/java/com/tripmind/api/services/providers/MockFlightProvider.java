package com.tripmind.api.services.providers;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class MockFlightProvider implements FlightProvider {

    @Override
    public List<Map<String, Object>> searchFlights(String origin, String destination, String date) {
        List<Map<String, Object>> flights = new ArrayList<>();
        Map<String, Object> f1 = new HashMap<>();
        f1.put("airline", "IndiGo");
        f1.put("price", 7800.0);
        f1.put("duration", "4h 15m");
        f1.put("nonStop", true);
        flights.add(f1);

        Map<String, Object> f2 = new HashMap<>();
        f2.put("airline", "Singapore Airlines");
        f2.put("price", 28500.0);
        f2.put("duration", "5h 45m");
        f2.put("nonStop", true);
        flights.add(f2);

        return flights;
    }

    @Override
    public Map<String, Object> getPriceForecast(String origin, String destination) {
        Map<String, Object> forecast = new HashMap<>();
        forecast.put("current", 78000.0);
        forecast.put("nextWeek", 71000.0);
        forecast.put("savings", 7000.0);
        forecast.put("trend", "DOWN");
        return forecast;
    }
}
