package com.tripmind.api.services.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component("emailNotificationProvider")
public class EmailNotificationProvider implements NotificationProvider {

    private static final Logger logger = LoggerFactory.getLogger(EmailNotificationProvider.class);

    @Override
    public void sendNotification(UUID userId, String title, String message, String type) {
        // Simulate SMTP / SES Email dispatching
        logger.info("[EMAIL PROVIDER] Sending mail to User {}: [{}] - Content: {}", userId, title, message);
    }
}
