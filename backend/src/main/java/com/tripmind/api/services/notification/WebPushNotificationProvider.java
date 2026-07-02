package com.tripmind.api.services.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component("webPushNotificationProvider")
public class WebPushNotificationProvider implements NotificationProvider {

    private static final Logger logger = LoggerFactory.getLogger(WebPushNotificationProvider.class);

    @Override
    public void sendNotification(UUID userId, String title, String message, String type) {
        // Simulate VAPID web push keys and service worker message dispatching
        logger.info("[WEB PUSH PROVIDER] Pushing notification to User {}: [{}] - Payload: {}", userId, title, message);
    }
}
