package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_day_id", nullable = false)
    private TripDay tripDay;

    @Column(length = 50)
    private String time;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 100)
    private String category;

    @Column(length = 50)
    private String duration;

    private Double budget;

    @Column(length = 255)
    private String address;

    private Double rating;

    @Column
    private Double latitude;

    @Column
    private Double longitude;
}
