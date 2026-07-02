package com.tripmind.api.services.providers;

import java.util.Map;

public interface CurrencyProvider {
    Map<String, Double> getExchangeRates(String baseCurrency);
}
