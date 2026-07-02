package com.tripmind.api.controllers;

import com.tripmind.api.entities.Trip;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.TripRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
public class CalendarController {

    private final TripRepository tripRepository;

    public CalendarController(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @GetMapping("/{id}/export/calendar")
    public ResponseEntity<String> exportTripCalendar(@PathVariable UUID id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        String dtFormat = "yyyyMMdd";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dtFormat);

        StringBuilder ics = new StringBuilder();
        ics.append("BEGIN:VCALENDAR\n");
        ics.append("VERSION:2.0\n");
        ics.append("PRODID:-//TripMindAI//iCal Export//EN\n");
        ics.append("BEGIN:VEVENT\n");
        ics.append("UID:").append(trip.getId().toString()).append("@tripmind.ai\n");
        ics.append("DTSTART;VALUE=DATE:").append(trip.getStartDate().format(formatter)).append("\n");
        ics.append("DTEND;VALUE=DATE:").append(trip.getEndDate().plusDays(1).format(formatter)).append("\n");
        ics.append("SUMMARY:").append(trip.getTitle()).append("\n");
        ics.append("DESCRIPTION:AI Generated Travel Plan to ").append(trip.getDestinationName()).append("\n");
        ics.append("END:VEVENT\n");
        ics.append("END:VCALENDAR\n");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"trip_" + trip.getId() + ".ics\"")
                .contentType(MediaType.parseMediaType("text/calendar"))
                .body(ics.toString());
    }
}
