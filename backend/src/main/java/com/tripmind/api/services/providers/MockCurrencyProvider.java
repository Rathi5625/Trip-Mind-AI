package com.tripmind.api.services.providers;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class MockCurrencyProvider implements CurrencyProvider {

    @Override
    public Map<String, Double> getExchangeRates(String baseCurrency) {
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
