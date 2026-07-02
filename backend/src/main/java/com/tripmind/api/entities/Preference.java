package com.tripmind.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "preferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Preference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "preference_traveler_types", joinColumns = @JoinColumn(name = "preference_id"))
    @Column(name = "traveler_type")
    @Builder.Default
    private List<String> travelerTypes = new ArrayList<>(); // backpacker, beach-lover, nature-traveler

    @Column(name = "budget_category", length = 50)
    private String budgetCategory; // budget, comfort, premium, luxury

    @Column(name = "pace_preference", length = 50)
    private String pacePreference; // relaxed, balanced, fast

    @Column(name = "group_type", length = 50)
    private String groupType; // solo, couple, friends, family

    @Column(length = 50)
    private String duration; // weekend, 1-week, 2-weeks, 1-month
}
