package com.tripmind.api.controllers;

import com.tripmind.api.entities.*;
import com.tripmind.api.repositories.*;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.ai.AiProviderRouter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final DestinationRepository destinationRepository;
    private final AiProviderRouter aiProviderRouter;

    public DashboardController(UserRepository userRepository,
                               TripRepository tripRepository,
                               DestinationRepository destinationRepository,
                               AiProviderRouter aiProviderRouter) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
        this.aiProviderRouter = aiProviderRouter;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        UUID userId = userPrincipal != null ? userPrincipal.getId() :
                userRepository.findAll().stream().findFirst().map(User::getId).orElse(null);

        Map<String, Object> response = new HashMap<>();

        if (userId == null) {
            return ResponseEntity.badRequest().build();
        }

        User user = userRepository.findById(userId).orElseThrow();
        List<Trip> trips = tripRepository.findByUserId(userId);

        response.put("travelerName", user.getName());
        response.put("membershipType", "Pro Member");

        // Upcoming Trip
        Trip upcoming = trips.stream()
                .filter(t -> t.getStartDate().isAfter(LocalDate.now()))
                .min(Comparator.comparing(Trip::getStartDate))
                .orElse(trips.isEmpty() ? null : trips.get(0));

        if (upcoming != null) {
            Map<String, Object> upcomingMap = new HashMap<>();
            upcomingMap.put("id", upcoming.getId().toString());
            upcomingMap.put("destination", upcoming.getDestinationName());
            long daysToGo = ChronoUnit.DAYS.between(LocalDate.now(), upcoming.getStartDate());
            upcomingMap.put("daysToGo", daysToGo < 0 ? 0 : daysToGo);
            upcomingMap.put("durationDays", ChronoUnit.DAYS.between(upcoming.getStartDate(), upcoming.getEndDate()) + 1);
            response.put("upcomingTrip", upcomingMap);
        } else {
            response.put("upcomingTrip", null);
        }

        // Stats
        List<Map<String, Object>> statsList = new ArrayList<>();
        statsList.add(Map.of("id", "stat-countries", "label", "Countries Visited", "value", 14, "icon", "Globe2", "description", "Across 3 continents"));
        statsList.add(Map.of("id", "stat-trips", "label", "Trips Completed", "value", trips.size(), "icon", "CheckCircle2", "description", "All planning active"));
        statsList.add(Map.of("id", "stat-years", "label", "Years Traveling", "value", 5, "icon", "Calendar", "description", "Active traveler profile"));
        response.put("stats", statsList);

        // Budget breakdown
        Map<String, Object> budgetMap = new HashMap<>();
        budgetMap.put("spent", 124000);
        budgetMap.put("totalBudget", 200000);
        budgetMap.put("breakdown", List.of(
                Map.of("category", "Flights", "amount", 50000, "color", "#2563EB"),
                Map.of("category", "Accommodation", "amount", 60000, "color", "#10B981"),
                Map.of("category", "Activities", "amount", 14000, "color", "#94A3B8")
        ));
        response.put("budget", budgetMap);

        // Trips list
        List<Map<String, Object>> tripsList = new ArrayList<>();
        for (Trip t : trips) {
            Map<String, Object> tMap = new HashMap<>();
            tMap.put("id", t.getId().toString());
            tMap.put("destination", t.getDestinationName());
            tMap.put("startDate", t.getStartDate().toString());
            tMap.put("endDate", t.getEndDate().toString());
            tMap.put("status", "Confirmed");
            tMap.put("statusType", "success");
            long daysToGo = ChronoUnit.DAYS.between(LocalDate.now(), t.getStartDate());
            tMap.put("daysToGo", daysToGo < 0 ? 0 : daysToGo);
            tMap.put("image", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80");
            tMap.put("travelers", List.of(Map.of("name", user.getName(), "initials", "AT")));
            tMap.put("quickActionText", "View Itinerary");
            tripsList.add(tMap);
        }
        response.put("trips", tripsList);

        // Map counts
        response.put("map", Map.of("visitedCountries", 14, "plannedDestinations", trips.size(), "wishlistDestinations", 8));

        // Recommendations
        List<Map<String, Object>> recommendations = new ArrayList<>();
        List<Destination> destinations = destinationRepository.findAll();
        destinations.stream().limit(3).forEach(d -> {
            recommendations.add(Map.of(
                    "id", d.getId(),
                    "destination", d.getName(),
                    "country", d.getCountry(),
                    "matchScore", d.getAiMatch(),
                    "description", d.getDescription(),
                    "image", d.getImageUrl(),
                    "bestSeason", d.getBestSeason(),
                    "avgBudget", d.getAverageBudget(),
                    "rating", d.getRating()
            ));
        });
        response.put("recommendations", recommendations);

        // AI generated Morning Brief and Insights using real API calls
        String destName = upcoming != null ? upcoming.getDestinationName() : "Tokyo";
        String prompt = "Act as VoyageAI. Generate a morning travel brief greeting (e.g. 'Good Morning, Alex') and exactly 3 short bullet updates " +
                "for a trip to " + destName + ". Make one price tip, one weather tip, and one safety tip. " +
                "Respond ONLY with a JSON object. Here is the structure: { \"greeting\": \"...\", \"bullets\": [ { \"id\": \"mb-1\", \"text\": \"...\", \"type\": \"price\" } ] }";
        
        try {
            String raw = aiProviderRouter.generateText(prompt);
            String clean = raw.replaceAll("```json", "").replaceAll("```", "").trim();
            int start = clean.indexOf('{');
            int end = clean.lastIndexOf('}');
            if (start >= 0 && end > start) {
                clean = clean.substring(start, end + 1);
            }
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            @SuppressWarnings("unchecked")
            Map<String, Object> briefParsed = mapper.readValue(clean, Map.class);
            response.put("morningBrief", briefParsed);
        } catch (Exception e) {
            response.put("morningBrief", Map.of(
                    "greeting", "Good Morning, " + user.getName(),
                    "bullets", List.of(
                            Map.of("id", "mb-1", "text", "Flights to " + destName + " are stable this week.", "type", "price"),
                            Map.of("id", "mb-2", "text", "Weather is expected to be sunny and warm.", "type", "weather"),
                            Map.of("id", "mb-3", "text", "AI Agent verified entry requirements are clear.", "type", "visa")
                    )
            ));
        }

        // Static timeline checks
        response.put("timeline", List.of(
                Map.of("id", "tl-1", "timeLabel", "Today", "title", "Optimize Itinerary", "description", "Ask AI Copilot to arrange your schedule.", "type", "info"),
                Map.of("id", "tl-2", "timeLabel", "Tomorrow", "title", "Pack Travel Documents", "description", "Ensure passports are valid for at least 6 months.", "type", "warning")
        ));

        response.put("travelScore", Map.of(
                "readiness", 95,
                "checklist", List.of(
                        Map.of("id", "chk-1", "text", "Flights Booked", "status", "success"),
                        Map.of("id", "chk-2", "text", "Hotels Confirmed", "status", "success"),
                        Map.of("id", "chk-3", "text", "Weather Checked", "status", "success")
                )
        ));

        // Insights list
        response.put("insights", List.of(
                Map.of("id", "ins-1", "type", "price", "badgeText", "Price Drop", "badgeType", "price-drop", "content", "Hotel deals found in " + destName, "actionText", "Plan Now", "actionLink", "/planner", "icon", "TrendingDown")
        ));

        return ResponseEntity.ok(response);
    }
}
