package com.tripmind.api.services.notification;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationManager {

    private final List<NotificationProvider> providers;

    public NotificationManager(List<NotificationProvider> providers) {
        this.providers = providers;
    }

    public void dispatch(UUID userId, String title, String message, String type) {
        for (NotificationProvider provider : providers) {
            try {
                provider.sendNotification(userId, title, message, type);
            } catch (Exception ex) {
                // Prevent failures in one channel from blocking others
                System.err.println("Failed to send notification via provider: " + provider.getClass().getSimpleName() + " - " + ex.getMessage());
            }
        }
    }
}
