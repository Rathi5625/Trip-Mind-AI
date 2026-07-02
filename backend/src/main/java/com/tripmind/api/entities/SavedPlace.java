package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "saved_places", indexes = {
    @Index(name = "idx_saved_place_user", columnList = "user_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "place_type", nullable = false, length = 50)
    private String placeType; // e.g. "HOTEL", "RESTAURANT", "ATTRACTION"

    @Column(name = "reference_id")
    private Long referenceId; // corresponding Hotel/Restaurant/Attraction ID if exists

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 200)
    private String address;

    private double rating;

    @Column(length = 500)
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
