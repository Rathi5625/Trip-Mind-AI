package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotels", indexes = {
    @Index(name = "idx_hotel_destination", columnList = "destination_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {
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

    @Column(name = "price_per_night")
    private double pricePerNight;

    private double rating;

    @Column(length = 200)
    private String address;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int stars;
}
