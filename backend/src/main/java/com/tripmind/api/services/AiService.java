package com.tripmind.api.services;

import com.tripmind.api.dtos.TransportationDto;
import com.tripmind.api.dtos.TripDayDto;
import com.tripmind.api.entities.Trip;
import com.tripmind.api.entities.TripDay;
import com.tripmind.api.entities.Transportation;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AiService {

    public List<TripDay> generateMockItinerary(Trip trip) {
        List<TripDay> days = new ArrayList<>();
        LocalDate currentDate = trip.getStartDate();
        int dayNum = 1;

        // Basic details based on destination
        String dest = trip.getDestinationName().toLowerCase();

        while (!currentDate.isAfter(trip.getEndDate())) {
            TripDay day = TripDay.builder()
                    .trip(trip)
                    .dayNumber(dayNum)
                    .date(currentDate)
                    .description("Explore the highlights of " + trip.getDestinationName() + " - Day " + dayNum)
                    .build();

            // Populate daily activities and transportation events
            List<Transportation> transportations = new ArrayList<>();
            
            // Morning transfer
            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("WALK")
                    .origin("Hotel")
                    .destination("Morning Sightseeing Spot")
                    .departureTime("09:00 AM")
                    .arrivalTime("09:30 AM")
                    .cost(0.0)
                    .duration("30m")
                    .build());

            // Afternoon taxi
            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("TAXI")
                    .origin("Sightseeing Spot")
                    .destination("Popular Local Restaurant")
                    .departureTime("12:30 PM")
                    .arrivalTime("01:00 PM")
                    .cost(15.0)
                    .duration("30m")
                    .build());

            // Evening subway / transit
            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("TRAIN")
                    .origin("Restaurant")
                    .destination("Evening Sunset Viewpoint")
                    .departureTime("04:30 PM")
                    .arrivalTime("05:00 PM")
                    .cost(3.50)
                    .duration("30m")
                    .build());

            day.setTransportations(transportations);
            days.add(day);

            currentDate = currentDate.plusDays(1);
            dayNum++;
        }

        return days;
    }
}
