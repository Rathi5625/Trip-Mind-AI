package com.tripmind.api.services.providers;

import java.util.List;
import java.util.Map;

public interface HotelProvider {
    List<Map<String, Object>> searchHotels(String destination, String checkIn, String checkOut, int guests);
}
