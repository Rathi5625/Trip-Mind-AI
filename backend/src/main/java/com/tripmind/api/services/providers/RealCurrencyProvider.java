package com.tripmind.api.services.providers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Component
@Primary
public class RealCurrencyProvider implements CurrencyProvider {

    private static final Logger logger = LoggerFactory.getLogger(RealCurrencyProvider.class);

    private final RestTemplate restTemplate;

    public RealCurrencyProvider(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Double> getExchangeRates(String baseCurrency) {
        try {
            String url = "https://open.er-api.com/v6/latest/" + baseCurrency.toUpperCase();
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("rates")) {
                return (Map<String, Double>) response.get("rates");
            }
        } catch (Exception e) {
            logger.error("Failed to fetch exchange rates from Open Exchange API, falling back: {}", e.getMessage());
        }

        return getMockRates(baseCurrency);
    }

    private Map<String, Double> getMockRates(String baseCurrency) {
        Map<String, Double> rates = new HashMap<>();
        if ("USD".equalsIgnoreCase(baseCurrency)) {
            rates.put("INR", 83.50);
            rates.put("EUR", 0.92);
            rates.put("JPY", 155.20);
            rates.put("CHF", 0.90);
        } else if ("INR".equalsIgnoreCase(baseCurrency)) {
            rates.put("USD", 0.012);
            rates.put("EUR", 0.011);
            rates.put("JPY", 1.86);
            rates.put("CHF", 0.011);
        } else {
            rates.put("USD", 1.0);
            rates.put("INR", 83.5);
            rates.put("EUR", 0.92);
        }
        return rates;
    }
}
