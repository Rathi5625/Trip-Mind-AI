package com.tripmind.api.services.providers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Component
@Primary
public class OpenWeatherProvider implements WeatherProvider {

    private static final Logger logger = LoggerFactory.getLogger(OpenWeatherProvider.class);

    private final RestTemplate restTemplate;

    @Value("${app.weather.api-key:}")
    private String apiKey;

    public OpenWeatherProvider(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getForecast(String destination, int days) {
        if (apiKey == null || apiKey.trim().isEmpty() || "your_weather_api_key_here".equals(apiKey)) {
            logger.warn("WeatherAPI key is not set. Falling back to mock data.");
            return getMockForecast(days);
        }

        try {
            // Using weatherapi.com endpoint as configured in the project .env
            String url = "https://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + destination + "&days=" + days;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("forecast")) {
                Map<String, Object> forecast = (Map<String, Object>) response.get("forecast");
                List<Map<String, Object>> forecastday = (List<Map<String, Object>>) forecast.get("forecastday");
                List<Map<String, Object>> parsedForecast = new ArrayList<>();

                int limit = Math.min(days, forecastday.size());
                for (int i = 0; i < limit; i++) {
                    Map<String, Object> forecastDayItem = forecastday.get(i);
                    Map<String, Object> dayInfo = (Map<String, Object>) forecastDayItem.get("day");
                    Map<String, Object> condition = dayInfo != null ? (Map<String, Object>) dayInfo.get("condition") : null;

                    Map<String, Object> day = new HashMap<>();
                    day.put("dayOffset", i);
                    day.put("tempMax", dayInfo != null ? dayInfo.get("maxtemp_c") : 25.0);
                    day.put("tempMin", dayInfo != null ? dayInfo.get("mintemp_c") : 15.0);
                    day.put("conditionText", condition != null ? condition.get("text") : "Clear");
                    parsedForecast.add(day);
                }
                return parsedForecast;
            }
        } catch (Exception e) {
            logger.error("Failed to fetch weather forecast from WeatherAPI, falling back: {}", e.getMessage());
        }

        return getMockForecast(days);
    }

    private List<Map<String, Object>> getMockForecast(int days) {
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
