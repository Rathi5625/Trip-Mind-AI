package com.tripmind.api.controllers;

import com.tripmind.api.dtos.BookingDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<BookingDto>> getUserBookings(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<BookingDto> response = bookingService.getBookingsByUserId(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<BookingDto>> getTripBookings(@PathVariable UUID tripId) {
        List<BookingDto> response = bookingService.getBookingsByTripId(tripId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody BookingDto bookingDto) {
        BookingDto response = bookingService.createBooking(userPrincipal.getId(), bookingDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable UUID id) {
        BookingDto response = bookingService.cancelBooking(id);
        return ResponseEntity.ok(response);
    }
}
