package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ai_travel_memories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiTravelMemory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "memory_text", columnDefinition = "TEXT", nullable = false)
    private String memoryText;

    @Column(length = 50)
    private String sentiment;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
