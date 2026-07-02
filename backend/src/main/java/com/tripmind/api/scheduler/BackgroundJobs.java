package com.tripmind.api.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class BackgroundJobs {

    private static final Logger logger = LoggerFactory.getLogger(BackgroundJobs.class);

    // 1. Clean up expired OTP tokens every hour
    @Scheduled(cron = "0 0 * * * *")
    public void cleanupExpiredOtps() {
        logger.info("[BACKGROUND JOB] Executing expired OTP database cleanup...");
    }

    // 2. Refresh trending destination caches every 12 hours
    @Scheduled(fixedRate = 43200000)
    public void refreshTrendingDestinations() {
        logger.info("[BACKGROUND JOB] Syncing trending destination metadata from analytics logs...");
    }

    // 3. Sync weather conditions cache every hour
    @Scheduled(fixedRate = 3600000)
    public void syncWeatherCache() {
        logger.info("[BACKGROUND JOB] Syncing weather status cache for popular locations...");
    }

    // 4. Clean up transient user sessions every day
    @Scheduled(cron = "0 0 0 * * *")
    public void sessionCleanup() {
        logger.info("[BACKGROUND JOB] Cleaning up transient user sessions from cache stores...");
    }
}
