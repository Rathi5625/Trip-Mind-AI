package com.tripmind.api.services.providers;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class MockHotelProvider implements HotelProvider {

    @Override
    public List<Map<String, Object>> searchHotels(String destination, String checkIn, String checkOut, int guests) {
        List<Map<String, Object>> hotels = new ArrayList<>();
        Map<String, Object> h1 = new HashMap<>();
        h1.put("name", "Royal Orchid Hotel");
        h1.put("pricePerNight", 120.0);
        h1.put("rating", 4.5);
        hotels.add(h1);

        Map<String, Object> h2 = new HashMap<>();
        h2.put("name", "Sunset Sands Resort");
        h2.put("pricePerNight", 250.0);
        h2.put("rating", 4.8);
        hotels.add(h2);

        return hotels;
    }
}
