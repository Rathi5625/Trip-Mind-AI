package com.tripmind.api.services;

import com.tripmind.api.entities.Trip;
import com.tripmind.api.entities.User;
import com.tripmind.api.repositories.DestinationRepository;
import com.tripmind.api.repositories.TripRepository;
import com.tripmind.api.repositories.UserRepository;
import com.tripmind.api.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final DestinationRepository destinationRepository;

    public DashboardService(UserRepository userRepository,
                            TripRepository tripRepository,
                            DestinationRepository destinationRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardData(UserPrincipal userPrincipal) {
        UUID userId = userPrincipal != null ? userPrincipal.getId() :
                userRepository.findAll().stream().findFirst().map(User::getId).orElse(null);

        if (userId == null) {
            throw new IllegalArgumentException("User not authenticated or no users exist in database.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        List<Trip> trips = tripRepository.findByUserId(userId);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("travelerName", user.getName());
        response.put("membershipType", "Pro Member");

        // Upcoming Trip
        Trip upcoming = trips.stream()
                .filter(t -> t.getStartDate() != null && t.getStartDate().isAfter(LocalDate.now()))
                .min(Comparator.comparing(Trip::getStartDate))
                .orElse(trips.isEmpty() ? null : trips.get(0));

        if (upcoming != null) {
            Map<String, Object> upcomingMap = new LinkedHashMap<>();
            upcomingMap.put("id", upcoming.getId().toString());
            upcomingMap.put("destination", upcoming.getDestinationName());
            long daysToGo = ChronoUnit.DAYS.between(LocalDate.now(), upcoming.getStartDate() != null ? upcoming.getStartDate() : LocalDate.now());
            upcomingMap.put("daysToGo", daysToGo < 0 ? 0 : daysToGo);
            upcomingMap.put("durationDays", (upcoming.getStartDate() != null && upcoming.getEndDate() != null)
                    ? ChronoUnit.DAYS.between(upcoming.getStartDate(), upcoming.getEndDate()) + 1 : 1);
            response.put("upcomingTrip", upcomingMap);
        } else {
            response.put("upcomingTrip", null);
        }

        // Stats summary
        List<Map<String, Object>> statsList = new ArrayList<>();
        statsList.add(Map.of("id", "stat-countries", "label", "Countries Visited", "value", 14, "icon", "Globe2", "description", "Across 3 continents"));
        statsList.add(Map.of("id", "stat-trips", "label", "Trips Completed", "value", trips.size(), "icon", "CheckCircle2", "description", "All planning active"));
        statsList.add(Map.of("id", "stat-years", "label", "Years Traveling", "value", 5, "icon", "Calendar", "description", "Active traveler profile"));
        response.put("stats", statsList);

        // Budget summary
        Map<String, Object> budgetMap = new LinkedHashMap<>();
        budgetMap.put("spent", 124000);
        budgetMap.put("totalBudget", 200000);
        budgetMap.put("breakdown", List.of(
                Map.of("category", "Flights", "amount", 50000, "color", "#2563EB"),
                Map.of("category", "Accommodation", "amount", 60000, "color", "#10B981"),
                Map.of("category", "Activities", "amount", 14000, "color", "#94A3B8")
        ));
        response.put("budget", budgetMap);

        // Trips summary
        List<Map<String, Object>> tripsList = new ArrayList<>();
        for (Trip t : trips) {
            Map<String, Object> tMap = new LinkedHashMap<>();
            tMap.put("id", t.getId().toString());
            tMap.put("destination", t.getDestinationName());
            tMap.put("startDate", t.getStartDate() != null ? t.getStartDate().toString() : "");
            tMap.put("endDate", t.getEndDate() != null ? t.getEndDate().toString() : "");
            tMap.put("status", "Confirmed");
            tMap.put("statusType", "success");
            long daysToGo = t.getStartDate() != null ? ChronoUnit.DAYS.between(LocalDate.now(), t.getStartDate()) : 0;
            tMap.put("daysToGo", daysToGo < 0 ? 0 : daysToGo);
            tMap.put("image", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80");
            tMap.put("travelers", List.of(Map.of("name", user.getName(), "initials", getInitials(user.getName()))));
            tripsList.add(tMap);
        }
        response.put("trips", tripsList);

        return response;
    }

    private String getInitials(String name) {
        if (name == null || name.isBlank()) return "TM";
        String[] parts = name.trim().split("\\s+");
        if (parts.length == 1) return parts[0].substring(0, Math.min(2, parts[0].length())).toUpperCase();
        return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
    }
}
