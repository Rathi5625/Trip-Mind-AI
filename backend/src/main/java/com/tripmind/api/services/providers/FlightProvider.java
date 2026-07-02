package com.tripmind.api.services.providers;

import java.util.List;
import java.util.Map;

public interface FlightProvider {
    List<Map<String, Object>> searchFlights(String origin, String destination, String date);
    Map<String, Object> getPriceForecast(String origin, String destination);
}
