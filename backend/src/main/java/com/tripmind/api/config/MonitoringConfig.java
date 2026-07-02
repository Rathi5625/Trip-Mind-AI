package com.tripmind.api.config;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.context.annotation.Configuration;
import java.util.concurrent.TimeUnit;

@Configuration
public class MonitoringConfig {

    private final MeterRegistry meterRegistry;
    private final Timer apiLatencyTimer;

    public MonitoringConfig(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        
        // Define custom Micrometer Prometheus latency tracking metric
        this.apiLatencyTimer = Timer.builder("tripmind.api.latency")
                .description("API Request processing latency")
                .register(meterRegistry);
    }

    public void recordApiLatency(long durationMs) {
        apiLatencyTimer.record(durationMs, TimeUnit.MILLISECONDS);
    }
}
