package com.tripmind.api.services.ai;

import com.tripmind.api.dtos.TripDto;
import com.tripmind.api.entities.*;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.TripDayRepository;
import com.tripmind.api.repositories.TripRepository;
import com.tripmind.api.repositories.TransportationRepository;
import com.tripmind.api.services.TripService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class ItineraryGeneratorService {

    private final TripRepository tripRepository;
    private final TripDayRepository tripDayRepository;
    private final TransportationRepository transportationRepository;
    private final TripService tripService;

    public ItineraryGeneratorService(TripRepository tripRepository,
                                     TripDayRepository tripDayRepository,
                                     TransportationRepository transportationRepository,
                                     TripService tripService) {
        this.tripRepository = tripRepository;
        this.tripDayRepository = tripDayRepository;
        this.transportationRepository = transportationRepository;
        this.tripService = tripService;
    }

    @Transactional
    public TripDto replaceActivity(UUID tripId, Long dayId, Long transportId, String newType, String newDestination) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        Transportation trans = transportationRepository.findById(transportId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity transportation block not found"));

        trans.setType(newType);
        trans.setDestination(newDestination);
        trans.setDuration("45m");
        trans.setCost(10.0);
        transportationRepository.save(trans);

        return tripService.mapToDto(trip);
    }

    @Transactional
    public TripDto optimizeRoute(UUID tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        // Simulate optimizing daily transportation routes (e.g. sorting by logical coordinate distances)
        for (TripDay day : trip.getDays()) {
            List<Transportation> items = day.getTransportations();
            if (items.size() > 2) {
                // Shuffle items to simulate a re-arranged optimized distance sequence
                Collections.shuffle(items);
                for (int i = 0; i < items.size(); i++) {
                    Transportation t = items.get(i);
                    t.setDepartureTime(String.format("%02d:00 PM", 1 + i * 2));
                    t.setArrivalTime(String.format("%02d:30 PM", 1 + i * 2));
                    transportationRepository.save(t);
                }
            }
        }

        return tripService.mapToDto(trip);
    }

    @Transactional
    public TripDto modifyTripLength(UUID tripId, int targetDays) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        List<TripDay> days = trip.getDays();
        int currentSize = days.size();

        if (targetDays < currentSize) {
            // Shorten trip
            List<TripDay> daysToRemove = new ArrayList<>(days.subList(targetDays, currentSize));
            days.removeAll(daysToRemove);
            trip.setEndDate(trip.getStartDate().plusDays(targetDays - 1));
        } else if (targetDays > currentSize) {
            // Extend trip
            LocalDate lastDate = days.isEmpty() ? trip.getStartDate() : days.get(days.size() - 1).getDate();
            for (int i = currentSize + 1; i <= targetDays; i++) {
                lastDate = lastDate.plusDays(1);
                TripDay day = TripDay.builder()
                        .trip(trip)
                        .dayNumber(i)
                        .date(lastDate)
                        .description("Extended Exploration of " + trip.getDestinationName() + " - Day " + i)
                        .build();

                List<Transportation> transportations = new ArrayList<>();
                transportations.add(Transportation.builder()
                        .tripDay(day)
                        .type("WALK")
                        .origin("Hotel")
                        .destination("Local Sightseeing Spot " + i)
                        .departureTime("10:00 AM")
                        .arrivalTime("10:30 AM")
                        .cost(0.0)
                        .duration("30m")
                        .build());
                
                day.setTransportations(transportations);
                days.add(day);
            }
            trip.setEndDate(lastDate);
        }

        Trip updatedTrip = tripRepository.save(trip);
        return tripService.mapToDto(updatedTrip);
    }
}
