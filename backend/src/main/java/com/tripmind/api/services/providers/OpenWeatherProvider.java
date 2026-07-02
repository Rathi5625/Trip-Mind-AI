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
        if (apiKey == null || apiKey.trim().isEmpty()) {
            logger.warn("OpenWeather API key is not set. Falling back to mock data.");
            return getMockForecast(days);
        }

        try {
            String url = "https://api.openweathermap.org/data/2.5/forecast?q=" + destination + "&units=metric&appid=" + apiKey;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("list")) {
                List<Map<String, Object>> list = (List<Map<String, Object>>) response.get("list");
                List<Map<String, Object>> parsedForecast = new ArrayList<>();
                
                int limit = Math.min(days, list.size());
                for (int i = 0; i < limit; i++) {
                    Map<String, Object> forecastItem = list.get(i);
                    Map<String, Object> main = (Map<String, Object>) forecastItem.get("main");
                    List<Map<String, Object>> weather = (List<Map<String, Object>>) forecastItem.get("weather");

                    Map<String, Object> day = new HashMap<>();
                    day.put("dayOffset", i);
                    day.put("tempMax", main != null ? main.get("temp_max") : 25.0);
                    day.put("tempMin", main != null ? main.get("temp_min") : 15.0);
                    day.put("conditionText", (weather != null && !weather.isEmpty()) ? weather.get(0).get("main") : "Clear");
                    parsedForecast.add(day);
                }
                return parsedForecast;
            }
        } catch (Exception e) {
            logger.error("Failed to fetch weather forecast from OpenWeather, falling back: {}", e.getMessage());
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
