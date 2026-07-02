package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attractions", indexes = {
    @Index(name = "idx_attraction_destination", columnList = "destination_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 500)
    private String imageUrl;

    @Column(name = "entry_fee")
    private double entryFee;

    private double rating;

    @Column(length = 200)
    private String address;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String category;
}
