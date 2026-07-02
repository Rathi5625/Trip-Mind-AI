package com.tripmind.api.services.notification;

import com.tripmind.api.services.NotificationService;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component("inAppNotificationProvider")
public class InAppNotificationProvider implements NotificationProvider {

    private final NotificationService notificationService;

    public InAppNotificationProvider(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Override
    public void sendNotification(UUID userId, String title, String message, String type) {
        notificationService.createNotification(userId, title, message, type);
    }
}
