package com.tripmind.api.services.notification;

import java.util.UUID;

public interface NotificationProvider {
    void sendNotification(UUID userId, String title, String message, String type);
}
