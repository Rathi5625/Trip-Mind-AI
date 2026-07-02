package com.tripmind.api.controllers;

import lombok.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.UUID;

@Controller
public class CollaborationController {

    @MessageMapping("/trip/{tripId}/typing")
    @SendTo("/topic/trip/{tripId}/typing")
    public TypingIndicator handleTyping(@DestinationVariable UUID tripId, @Payload TypingIndicator indicator) {
        return indicator;
    }

    @MessageMapping("/trip/{tripId}/cursor")
    @SendTo("/topic/trip/{tripId}/cursor")
    public CursorLocation handleCursor(@DestinationVariable UUID tripId, @Payload CursorLocation location) {
        return location;
    }

    @MessageMapping("/trip/{tripId}/comment")
    @SendTo("/topic/trip/{tripId}/comment")
    public CommentMessage handleComment(@DestinationVariable UUID tripId, @Payload CommentMessage comment) {
        return comment;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TypingIndicator {
        private String userName;
        private boolean isTyping;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CursorLocation {
        private String userName;
        private double latitude;
        private double longitude;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommentMessage {
        private String userName;
        private String comment;
        private String timestamp;
    }
}
