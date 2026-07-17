package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_hidden_gems")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiHiddenGem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "destination_name", nullable = false, length = 150)
    private String destinationName;

    @Column(name = "gem_name", nullable = false, length = 200)
    private String gemName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "discovery_score")
    private Integer discoveryScore;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
