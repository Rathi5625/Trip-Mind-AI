package com.tripmind.api.services;

import com.tripmind.api.dtos.*;
import com.tripmind.api.entities.*;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    public TripService(TripRepository tripRepository,
                       UserRepository userRepository,
                       AiService aiService) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }

    public List<TripDto> getTripsByUserId(UUID userId) {
        return tripRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TripDto getTripById(UUID id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));
        return mapToDto(trip);
    }

    @Transactional
    public TripDto createTrip(UUID userId, TripDto tripDto, boolean triggerAiGeneration) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Trip trip = Trip.builder()
                .user(user)
                .title(tripDto.getTitle())
                .destinationName(tripDto.getDestinationName())
                .startDate(tripDto.getStartDate())
                .endDate(tripDto.getEndDate())
                .budgetCategory(tripDto.getBudgetCategory())
                .travelersCount(tripDto.getTravelersCount())
                .pace(tripDto.getPace())
                .isPublic(tripDto.isPublic())
                .build();

        if (triggerAiGeneration) {
            List<TripDay> days = aiService.generateMockItinerary(trip);
            trip.setDays(days);
        }

        Trip savedTrip = tripRepository.save(trip);
        return mapToDto(savedTrip);
    }

    @Transactional
    public TripDto updateTrip(UUID id, TripDto tripDto) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        trip.setTitle(tripDto.getTitle());
        trip.setStartDate(tripDto.getStartDate());
        trip.setEndDate(tripDto.getEndDate());
        trip.setBudgetCategory(tripDto.getBudgetCategory());
        trip.setTravelersCount(tripDto.getTravelersCount());
        trip.setPace(tripDto.getPace());
        trip.setPublic(tripDto.isPublic());

        Trip updatedTrip = tripRepository.save(trip);
        return mapToDto(updatedTrip);
    }

    @Transactional
    public void deleteTrip(UUID id) {
        if (!tripRepository.existsById(id)) {
            throw new ResourceNotFoundException("Trip not found");
        }
        tripRepository.deleteById(id);
    }

    public TripDto mapToDto(Trip trip) {
        List<TripDayDto> dayDtos = trip.getDays().stream().map(day ->
                TripDayDto.builder()
                        .id(day.getId())
                        .dayNumber(day.getDayNumber())
                        .date(day.getDate())
                        .description(day.getDescription())
                        .transportations(day.getTransportations().stream().map(t ->
                                TransportationDto.builder()
                                        .id(t.getId())
                                        .type(t.getType())
                                        .origin(t.getOrigin())
                                        .destination(t.getDestination())
                                        .departureTime(t.getDepartureTime())
                                        .arrivalTime(t.getArrivalTime())
                                        .cost(t.getCost())
                                        .duration(t.getDuration())
                                        .build()
                        ).collect(Collectors.toList()))
                        .activities(day.getActivities() == null ? java.util.Collections.emptyList() : day.getActivities().stream().map(act ->
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

        return TripDto.builder()
                .id(trip.getId())
                .title(trip.getTitle())
                .destinationName(trip.getDestinationName())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .budgetCategory(trip.getBudgetCategory())
                .travelersCount(trip.getTravelersCount())
                .pace(trip.getPace())
                .isPublic(trip.isPublic())
                .createdAt(trip.getCreatedAt())
                .days(dayDtos)
                .build();
    }
}
