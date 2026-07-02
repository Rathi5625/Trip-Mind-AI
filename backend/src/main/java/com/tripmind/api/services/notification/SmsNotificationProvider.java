package com.tripmind.api.services.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component("smsNotificationProvider")
public class SmsNotificationProvider implements NotificationProvider {

    private static final Logger logger = LoggerFactory.getLogger(SmsNotificationProvider.class);

    @Override
    public void sendNotification(UUID userId, String title, String message, String type) {
        // Simulate Twilio SMS dispatching
        logger.info("[SMS PROVIDER] Sending SMS alert to User {}: [{}] - Text: {}", userId, title, message);
    }
}
