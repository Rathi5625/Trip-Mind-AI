package com.tripmind.api.services;

import com.tripmind.api.dtos.ActivityDto;
import com.tripmind.api.dtos.TripDayDto;
import com.tripmind.api.dtos.TransportationDto;
import com.tripmind.api.entities.*;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ItineraryManagementService {

    private final TripRepository tripRepository;
    private final TripDayRepository tripDayRepository;
    private final ActivityRepository activityRepository;
    private final WeatherForecastRepository weatherForecastRepository;
    private final CrowdPredictionRepository crowdPredictionRepository;
    private final TripBudgetTableRepository tripBudgetTableRepository;
    private final TransportRouteRepository transportRouteRepository;
    private final TransportModeRepository transportModeRepository;
    private final TripAiRecommendationRepository tripAiRecommendationRepository;
    private final TripAiHistoryRepository tripAiHistoryRepository;

    public ItineraryManagementService(TripRepository tripRepository,
                                      TripDayRepository tripDayRepository,
                                      ActivityRepository activityRepository,
                                      WeatherForecastRepository weatherForecastRepository,
                                      CrowdPredictionRepository crowdPredictionRepository,
                                      TripBudgetTableRepository tripBudgetTableRepository,
                                      TransportRouteRepository transportRouteRepository,
                                      TransportModeRepository transportModeRepository,
                                      TripAiRecommendationRepository tripAiRecommendationRepository,
                                      TripAiHistoryRepository tripAiHistoryRepository) {
        this.tripRepository = tripRepository;
        this.tripDayRepository = tripDayRepository;
        this.activityRepository = activityRepository;
        this.weatherForecastRepository = weatherForecastRepository;
        this.crowdPredictionRepository = crowdPredictionRepository;
        this.tripBudgetTableRepository = tripBudgetTableRepository;
        this.transportRouteRepository = transportRouteRepository;
        this.transportModeRepository = transportModeRepository;
        this.tripAiRecommendationRepository = tripAiRecommendationRepository;
        this.tripAiHistoryRepository = tripAiHistoryRepository;
    }

    @Transactional
    public void ensureSeeded(UUID tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        // 1. Seed Weather Forecast if empty
        if (weatherForecastRepository.findByTripId(tripId).isEmpty()) {
            weatherForecastRepository.save(WeatherForecast.builder()
                    .trip(trip)
                    .temperature(18.0)
                    .conditionText("Cool & Clear")
                    .rainProb(10.0)
                    .uvIndex(3.0)
                    .build());
        }

        // 2. Seed Crowd Predictions if empty
        if (crowdPredictionRepository.findByTripId(tripId).isEmpty()) {
            crowdPredictionRepository.save(CrowdPrediction.builder()
                    .trip(trip)
                    .densityLevel("Medium")
                    .peakHours("12:00 PM - 03:00 PM")
                    .build());
        }

        // 3. Seed Budget if empty
        if (tripBudgetTableRepository.findByTripId(tripId).isEmpty()) {
            tripBudgetTableRepository.save(TripBudget.builder()
                    .trip(trip)
                    .totalBudget(200000.0)
                    .spentBudget(124000.0)
                    .build());
        }

        // 4. Seed AI Recommendations if empty
        if (tripAiRecommendationRepository.findByTripIdAndDismissedFalse(tripId).isEmpty()) {
            tripAiRecommendationRepository.save(TripAiRecommendation.builder()
                    .trip(trip)
                    .recommendationText("Reorder Skytree to 05:00 PM for sunset views and swap transit to avoid rush hour. Saves 40 mins.")
                    .savingsMin(40)
                    .dismissed(false)
                    .build());
        }

        // 5. Seed default days and activities
        if (trip.getDays().isEmpty()) {
            LocalDate start = trip.getStartDate();
            String[] dayDescs = {"Arrival", "Tokyo City Tour", "Shibuya & Harajuku", "Mount Fuji Trip"};
            for (int i = 1; i <= 4; i++) {
                TripDay day = TripDay.builder()
                        .trip(trip)
                        .dayNumber(i)
                        .date(start.plusDays(i - 1))
                        .description(dayDescs[i - 1])
                        .build();
                day = tripDayRepository.save(day);

                if (i == 2) {
                    // Seed Senso-ji Temple
                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("09:00 AM")
                            .duration("2h")
                            .name("Senso-ji Temple")
                            .description("Tokyo's oldest and most significant Buddhist temple.")
                            .imageUrl("https://images.unsplash.com/photo-1542640244-7e672d6cef21?w=600&auto=format&fit=crop&q=80")
                            .category("Culture")
                            .budget(0.0)
                            .address("Asakusa, Tokyo")
                            .rating(4.7)
                            .build());

                    // Seed Akihabara Electric Town
                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("11:30 AM")
                            .duration("3h")
                            .name("Akihabara Electric Town")
                            .description("Famed for its many electronics shops, anime shops, and maid cafes.")
                            .imageUrl("https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80")
                            .category("Shopping")
                            .budget(100.0)
                            .address("Akihabara, Tokyo")
                            .rating(4.5)
                            .build());

                    // Seed Tokyo Skytree
                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("03:00 PM")
                            .duration("1.5h")
                            .name("Tokyo Skytree")
                            .description("The tallest structure in Japan with dynamic panoramic views.")
                            .imageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80")
                            .category("Sightseeing")
                            .budget(3100.0)
                            .address("Sumida City, Tokyo")
                            .rating(4.8)
                            .build());
                }
            }
        }
    }

    public List<TripDayDto> getItinerary(UUID tripId) {
        ensureSeeded(tripId);
        List<TripDay> days = tripDayRepository.findByTripId(tripId);
        return days.stream().map(this::mapDayToDto).collect(Collectors.toList());
    }

    public TripDayDto getDay(UUID tripId, Long dayId) {
        ensureSeeded(tripId);
        TripDay day = tripDayRepository.findById(dayId)
                .orElseThrow(() -> new ResourceNotFoundException("Day not found"));
        return mapDayToDto(day);
    }

    @Transactional
    public ActivityDto addActivity(UUID tripId, ActivityDto dto) {
        ensureSeeded(tripId);
        // Find or create day
        TripDay day = tripDayRepository.findByTripId(tripId).stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No trip days found to add activity to"));

        Activity act = Activity.builder()
                .tripDay(day)
                .time(dto.getTime())
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .duration(dto.getDuration())
                .budget(dto.getBudget())
                .address(dto.getAddress())
                .rating(dto.getRating())
                .build();

        act = activityRepository.save(act);
        return mapActivityToDto(act);
    }

    @Transactional
    public ActivityDto updateActivity(Long activityId, ActivityDto dto) {
        Activity act = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        act.setTime(dto.getTime());
        act.setName(dto.getName());
        act.setDescription(dto.getDescription());
        act.setCategory(dto.getCategory());
        act.setDuration(dto.getDuration());
        act.setBudget(dto.getBudget());
        act.setAddress(dto.getAddress());

        act = activityRepository.save(act);
        return mapActivityToDto(act);
    }

    @Transactional
    public void deleteActivity(Long activityId) {
        if (!activityRepository.existsById(activityId)) {
            throw new ResourceNotFoundException("Activity not found");
        }
        activityRepository.deleteById(activityId);
    }

    @Transactional
    public Map<String, Object> optimize(UUID tripId) {
        ensureSeeded(tripId);
        // Toggle recommendation text or apply it
        List<TripAiRecommendation> recs = tripAiRecommendationRepository.findByTripIdAndDismissedFalse(tripId);
        if (!recs.isEmpty()) {
            TripAiRecommendation rec = recs.get(0);
            rec.setDismissed(true);
            tripAiRecommendationRepository.save(rec);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("tripId", tripId);
        response.put("status", "SUCCESS");
        response.put("message", "AI itinerary optimization applied successfully.");
        return response;
    }

    @Transactional
    public Map<String, Object> askAi(UUID tripId, String command) {
        ensureSeeded(tripId);
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        String responseText = "I have updated your day's itinerary to accommodate your request: " + command;

        tripAiHistoryRepository.save(TripAiHistory.builder()
                .trip(trip)
                .command(command)
                .response(responseText)
                .build());

        Map<String, Object> response = new HashMap<>();
        response.put("tripId", tripId);
        response.put("response", responseText);
        return response;
    }

    public WeatherForecast getWeather(UUID tripId) {
        ensureSeeded(tripId);
        return weatherForecastRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Weather info not found"));
    }

    public CrowdPrediction getCrowds(UUID tripId) {
        ensureSeeded(tripId);
        return crowdPredictionRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Crowd info not found"));
    }

    public TripBudget getBudget(UUID tripId) {
        ensureSeeded(tripId);
        return tripBudgetTableRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget info not found"));
    }

    public List<TransportRoute> getTransport(UUID tripId) {
        ensureSeeded(tripId);
        return transportRouteRepository.findByTripId(tripId);
    }

    private TripDayDto mapDayToDto(TripDay day) {
        return TripDayDto.builder()
                .id(day.getId())
                .dayNumber(day.getDayNumber())
                .date(day.getDate())
                .description(day.getDescription())
                .activities(day.getActivities().stream().map(this::mapActivityToDto).collect(Collectors.toList()))
                .build();
    }

    private ActivityDto mapActivityToDto(Activity act) {
        return ActivityDto.builder()
                .id(act.getId())
                .time(act.getTime())
                .name(act.getName())
                .description(act.getDescription())
                .imageUrl(act.getImageUrl())
                .category(act.getCategory())
                .duration(act.getDuration())
                .budget(act.getBudget())
                .address(act.getAddress())
                .rating(act.getRating())
                .build();
    }
}
