package com.tripmind.api.services;

import com.tripmind.api.dtos.*;
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
public class WorkspaceService {

    private final TripRepository tripRepository;
    private final TripProgressRepository tripProgressRepository;
    private final TripInsightRepository tripInsightRepository;
    private final TripStatsRepository tripStatsRepository;
    private final TripWeatherRepository tripWeatherRepository;
    private final TripAiForecastRepository tripAiForecastRepository;
    private final ExpenseRepository expenseRepository;
    private final BookingRepository bookingRepository;
    private final TripDayRepository tripDayRepository;
    private final ActivityRepository activityRepository;

    public WorkspaceService(TripRepository tripRepository,
                            TripProgressRepository tripProgressRepository,
                            TripInsightRepository tripInsightRepository,
                            TripStatsRepository tripStatsRepository,
                            TripWeatherRepository tripWeatherRepository,
                            TripAiForecastRepository tripAiForecastRepository,
                            ExpenseRepository expenseRepository,
                            BookingRepository bookingRepository,
                            TripDayRepository tripDayRepository,
                            ActivityRepository activityRepository) {
        this.tripRepository = tripRepository;
        this.tripProgressRepository = tripProgressRepository;
        this.tripInsightRepository = tripInsightRepository;
        this.tripStatsRepository = tripStatsRepository;
        this.tripWeatherRepository = tripWeatherRepository;
        this.tripAiForecastRepository = tripAiForecastRepository;
        this.expenseRepository = expenseRepository;
        this.bookingRepository = bookingRepository;
        this.tripDayRepository = tripDayRepository;
        this.activityRepository = activityRepository;
    }

    @Transactional
    public void ensureSeeded(UUID tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        // 1. Seed progress if not present
        if (tripProgressRepository.findByTripId(tripId).isEmpty()) {
            tripProgressRepository.save(TripProgress.builder()
                    .trip(trip)
                    .progressPercent(87)
                    .tasksRemaining("Confirm Shinkansen Pass,Book Team Dinner")
                    .build());
        }

        // 2. Seed stats if not present
        if (tripStatsRepository.findByTripId(tripId).isEmpty()) {
            tripStatsRepository.save(TripStats.builder()
                    .trip(trip)
                    .countdownDays(12)
                    .aiScore(97)
                    .spentBudget(1200.0)
                    .totalBudget(3500.0)
                    .statusBadge("ON TRACK")
                    .build());
        }

        // 3. Seed weather if not present
        if (tripWeatherRepository.findByTripId(tripId).isEmpty()) {
            tripWeatherRepository.save(TripWeather.builder()
                    .trip(trip)
                    .temperature(18.0)
                    .currency("JPY")
                    .timezone("GMT+9")
                    .safetyRating(9.8)
                    .build());
        }

        // 4. Seed insights if not present
        if (tripInsightRepository.findByTripId(tripId).isEmpty()) {
            tripInsightRepository.save(TripInsight.builder()
                    .trip(trip)
                    .type("FLIGHT_DEALS")
                    .title("Flight Deals")
                    .description("Flights to " + trip.getDestinationName() + " are currently 12% below the seasonal average.")
                    .icon("trending-down")
                    .build());

            tripInsightRepository.save(TripInsight.builder()
                    .trip(trip)
                    .type("WEATHER")
                    .title("Optimal Window")
                    .description("Weather forecast is ideal for the entire duration of your stay.")
                    .icon("cloud-sun")
                    .build());

            tripInsightRepository.save(TripInsight.builder()
                    .trip(trip)
                    .type("BUDGET_PIVOT")
                    .title("Budget Pivot")
                    .description("Save $150 by adjusting hotel selection to Ginza East area.")
                    .icon("wallet")
                    .build());
        }

        // 5. Seed AI Forecasts if not present
        if (tripAiForecastRepository.findByTripId(tripId).isEmpty()) {
            tripAiForecastRepository.save(TripAiForecast.builder()
                    .trip(trip)
                    .forecastText("Demand is expected to rise by 15% next week. Lock in bookings now.")
                    .category("ALERT")
                    .build());
        }

        // 6. Seed Expenses if not present
        if (expenseRepository.findByTripId(tripId).isEmpty()) {
            expenseRepository.save(Expense.builder()
                    .trip(trip)
                    .title("Flight Booking")
                    .amount(800.0)
                    .category("Flights")
                    .date(LocalDate.now())
                    .build());

            expenseRepository.save(Expense.builder()
                    .trip(trip)
                    .title("Hotel Deposit")
                    .amount(400.0)
                    .category("Accommodation")
                    .date(LocalDate.now())
                    .build());
        }

        // 7. Seed Trip Days and Activities if not present
        if (trip.getDays().isEmpty()) {
            LocalDate start = trip.getStartDate();
            for (int i = 1; i <= 2; i++) {
                TripDay day = TripDay.builder()
                        .trip(trip)
                        .dayNumber(i)
                        .date(start.plusDays(i - 1))
                        .description("Day " + i + " Exploration")
                        .build();
                day = tripDayRepository.save(day);

                if (i == 1) {
                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("10:30 AM")
                            .name("Arrival at Narita")
                            .description("Land and transfer through Terminal 2.")
                            .imageUrl("https://images.unsplash.com/photo-1542640244-7e672d6cef21?w=600&auto=format&fit=crop&q=80")
                            .category("Arrival")
                            .duration("2 hours")
                            .budget(10.0)
                            .address("Narita International Airport")
                            .rating(4.5)
                            .build());

                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("06:00 PM")
                            .name("Tokyo Tower Visit")
                            .description("Enjoy stunning skyline views at sunset.")
                            .imageUrl("https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80")
                            .category("Sightseeing")
                            .duration("1.5 hours")
                            .budget(25.0)
                            .address("Minato City, Tokyo")
                            .rating(4.8)
                            .build());
                } else {
                    activityRepository.save(Activity.builder()
                            .tripDay(day)
                            .time("11:00 AM")
                            .name("Shibuya Crossing")
                            .description("Walk the busiest intersection in the world.")
                            .imageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80")
                            .category("Sightseeing")
                            .duration("1 hour")
                            .budget(0.0)
                            .address("Shibuya, Tokyo")
                            .rating(4.7)
                            .build());
                }
            }
            // Reload trip days
            trip.setDays(tripDayRepository.findByTripId(tripId));
        }

        // 8. Seed Bookings if not present
        if (bookingRepository.findByTripId(tripId).isEmpty()) {
            bookingRepository.save(Booking.builder()
                    .trip(trip)
                    .user(trip.getUser())
                    .resourceType("FLIGHT")
                    .resourceName("JL-742 Tokyo Express")
                    .referenceNumber("NRT-JL-742")
                    .price(800.0)
                    .status("CONFIRMED")
                    .details("Seat 22A, Terminal 2")
                    .startTime(LocalDateTime.now())
                    .build());

            bookingRepository.save(Booking.builder()
                    .trip(trip)
                    .user(trip.getUser())
                    .resourceType("HOTEL")
                    .resourceName("The Ginza Hotel")
                    .referenceNumber("GH-99882")
                    .price(400.0)
                    .status("CONFIRMED")
                    .details("Deluxe Double Room")
                    .startTime(LocalDateTime.now())
                    .build());
        }
    }

    public Map<String, Object> getOverview(UUID tripId) {
        ensureSeeded(tripId);

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        TripProgress progress = tripProgressRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Progress info not found"));

        TripStats stats = tripStatsRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Stats info not found"));

        TripWeather weather = tripWeatherRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Weather info not found"));

        List<TripInsight> insights = tripInsightRepository.findByTripId(tripId);

        Map<String, Object> response = new HashMap<>();
        response.put("tripId", tripId);
        response.put("title", trip.getTitle());
        response.put("destinationName", trip.getDestinationName());
        response.put("startDate", trip.getStartDate());
        response.put("endDate", trip.getEndDate());
        response.put("budgetCategory", trip.getBudgetCategory());
        response.put("travelersCount", trip.getTravelersCount());
        response.put("pace", trip.getPace());

        // Progress
        Map<String, Object> progressMap = new HashMap<>();
        progressMap.put("percent", progress.getProgressPercent());
        progressMap.put("tasksRemaining", Arrays.asList(progress.getTasksRemaining().split(",")));
        response.put("progress", progressMap);

        // Stats
        Map<String, Object> statsMap = new HashMap<>();
        statsMap.put("countdownDays", stats.getCountdownDays());
        statsMap.put("aiScore", stats.getAiScore());
        statsMap.put("spentBudget", stats.getSpentBudget());
        statsMap.put("totalBudget", stats.getTotalBudget());
        statsMap.put("statusBadge", stats.getStatusBadge());
        response.put("stats", statsMap);

        // Weather & Info
        Map<String, Object> weatherMap = new HashMap<>();
        weatherMap.put("temperature", weather.getTemperature());
        weatherMap.put("currency", weather.getCurrency());
        weatherMap.put("timezone", weather.getTimezone());
        weatherMap.put("safetyRating", weather.getSafetyRating());
        response.put("weather", weatherMap);

        // Insights
        response.put("insights", insights.stream().map(ins -> {
            Map<String, Object> iMap = new HashMap<>();
            iMap.put("type", ins.getType());
            iMap.put("title", ins.getTitle());
            iMap.put("description", ins.getDescription());
            iMap.put("icon", ins.getIcon());
            return iMap;
        }).collect(Collectors.toList()));

        return response;
    }

    public List<TripDayDto> getTimeline(UUID tripId) {
        ensureSeeded(tripId);

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        return trip.getDays().stream().map(day ->
                TripDayDto.builder()
                        .id(day.getId())
                        .dayNumber(day.getDayNumber())
                        .date(day.getDate())
                        .description(day.getDescription())
                        .activities(day.getActivities().stream().map(act ->
                                ActivityDto.builder()
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
                                        .build()
                        ).collect(Collectors.toList()))
                        .build()
        ).collect(Collectors.toList());
    }

    public TripProgress getProgress(UUID tripId) {
        ensureSeeded(tripId);
        return tripProgressRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Progress info not found"));
    }

    public List<TripAiForecast> getForecast(UUID tripId) {
        ensureSeeded(tripId);
        return tripAiForecastRepository.findByTripId(tripId);
    }

    public List<BookingDto> getBookings(UUID tripId) {
        ensureSeeded(tripId);
        return bookingRepository.findByTripId(tripId).stream().map(b ->
                BookingDto.builder()
                        .id(b.getId())
                        .userId(b.getUser().getId())
                        .tripId(b.getTrip() != null ? b.getTrip().getId() : null)
                        .resourceType(b.getResourceType())
                        .resourceName(b.getResourceName())
                        .referenceNumber(b.getReferenceNumber())
                        .price(b.getPrice())
                        .status(b.getStatus())
                        .details(b.getDetails())
                        .startTime(b.getStartTime())
                        .endTime(b.getEndTime())
                        .createdAt(b.getCreatedAt())
                        .build()
        ).collect(Collectors.toList());
    }

    public Map<String, Object> getAnalytics(UUID tripId) {
        ensureSeeded(tripId);

        List<Expense> expenses = expenseRepository.findByTripId(tripId);
        double totalSpent = expenses.stream().mapToDouble(Expense::getAmount).sum();

        Map<String, Double> categoryBreakdown = expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)));

        Map<String, Object> response = new HashMap<>();
        response.put("tripId", tripId);
        response.put("totalSpent", totalSpent);
        response.put("categoryBreakdown", categoryBreakdown);
        response.put("expenses", expenses.stream().map(exp -> {
            Map<String, Object> eMap = new HashMap<>();
            eMap.put("id", exp.getId());
            eMap.put("title", exp.getTitle());
            eMap.put("amount", exp.getAmount());
            eMap.put("category", exp.getCategory());
            eMap.put("date", exp.getDate());
            return eMap;
        }).collect(Collectors.toList()));

        return response;
    }
}
