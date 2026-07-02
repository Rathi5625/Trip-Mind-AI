package com.tripmind.api.services;

import com.tripmind.api.dtos.BookingDto;
import com.tripmind.api.entities.Booking;
import com.tripmind.api.entities.Trip;
import com.tripmind.api.entities.User;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.BookingRepository;
import com.tripmind.api.repositories.TripRepository;
import com.tripmind.api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, TripRepository tripRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    public List<BookingDto> getBookingsByUserId(UUID userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getBookingsByTripId(UUID tripId) {
        return bookingRepository.findByTripId(tripId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto createBooking(UUID userId, BookingDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Trip trip = null;
        if (dto.getTripId() != null) {
            trip = tripRepository.findById(dto.getTripId())
                    .orElse(null);
        }

        // Generate unique 12-char reference number, e.g. TMAI-948271
        String refNum = "TMAI-" + String.format("%06d", new Random().nextInt(999999));

        Booking booking = Booking.builder()
                .user(user)
                .trip(trip)
                .resourceType(dto.getResourceType())
                .resourceName(dto.getResourceName())
                .referenceNumber(refNum)
                .price(dto.getPrice())
                .status("PENDING")
                .details(dto.getDetails())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return mapToDto(savedBooking);
    }

    @Transactional
    public BookingDto cancelBooking(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus("CANCELLED");
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDto(savedBooking);
    }

    @Transactional
    public BookingDto confirmBooking(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus("CONFIRMED");
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDto(savedBooking);
    }

    public BookingDto mapToDto(Booking b) {
        return BookingDto.builder()
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
                .build();
    }
}
