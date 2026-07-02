package com.tripmind.api.scheduler;

import com.tripmind.api.entities.Destination;
import com.tripmind.api.entities.WeatherCache;
import com.tripmind.api.repositories.DestinationRepository;
import com.tripmind.api.repositories.WeatherCacheRepository;
import com.tripmind.api.services.providers.WeatherProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Component
public class CacheSyncScheduler {

    private static final Logger logger = LoggerFactory.getLogger(CacheSyncScheduler.class);

    private final DestinationRepository destinationRepository;
    private final WeatherCacheRepository weatherCacheRepository;
    private final WeatherProvider weatherProvider;

    public CacheSyncScheduler(DestinationRepository destinationRepository,
                              WeatherCacheRepository weatherCacheRepository,
                              WeatherProvider weatherProvider) {
        this.destinationRepository = destinationRepository;
        this.weatherCacheRepository = weatherCacheRepository;
        this.weatherProvider = weatherProvider;
    }

    // Run cache updates daily (every 24 hours)
    @Scheduled(fixedRate = 86400000)
    @Transactional
    public void syncWeatherCache() {
        logger.info("Executing background task: Syncing Weather Cache...");
        List<Destination> destinations = destinationRepository.findAll();

        for (Destination destination : destinations) {
            try {
                // Fetch forecast using weather provider
                List<Map<String, Object>> forecast = weatherProvider.getForecast(destination.getName(), 1);
                if (!forecast.isEmpty()) {
                    Map<String, Object> dayForecast = forecast.get(0);
                    
                    LocalDate date = LocalDate.now();
                    double tempMax = (double) dayForecast.get("tempMax");
                    double tempMin = (double) dayForecast.get("tempMin");
                    String cond = (String) dayForecast.get("conditionText");

                    WeatherCache cache = weatherCacheRepository.findByDestinationIdAndDate(destination.getId(), date)
                            .orElse(WeatherCache.builder().destination(destination).date(date).build());

                    cache.setTempMax(tempMax);
                    cache.setTempMin(tempMin);
                    cache.setConditionText(cond);
                    cache.setCode(cond.toLowerCase().replace(" ", ""));
                    cache.setHumidity(60.0);
                    cache.setWindKph(15.0);

                    weatherCacheRepository.save(cache);
                }
            } catch (Exception e) {
                logger.error("Failed to sync weather cache for destination {}: {}", destination.getName(), e.getMessage());
            }
        }
        logger.info("Weather Cache sync completed for {} destinations.", destinations.size());
    }
}
