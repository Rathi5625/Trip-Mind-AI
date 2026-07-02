package com.tripmind.api.services.providers;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class MockWeatherProvider implements WeatherProvider {

    @Override
    public List<Map<String, Object>> getForecast(String destination, int days) {
        List<Map<String, Object>> forecastList = new ArrayList<>();
        String[] conditions = {"Sunny", "Cloudy", "Rainy", "Windy", "Partly Cloudy"};

        for (int i = 0; i < days; i++) {
            Map<String, Object> day = new HashMap<>();
            day.put("dayOffset", i);
            day.put("tempMax", 22.0 + (i % 5));
            day.put("tempMin", 14.0 + (i % 3));
            day.put("conditionText", conditions[i % conditions.length]);
            forecastList.add(day);
        }
        return forecastList;
    }
}
