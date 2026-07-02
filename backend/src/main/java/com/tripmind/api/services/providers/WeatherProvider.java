package com.tripmind.api.services.providers;

import java.util.List;
import java.util.Map;

public interface WeatherProvider {
    List<Map<String, Object>> getForecast(String destination, int days);
}
