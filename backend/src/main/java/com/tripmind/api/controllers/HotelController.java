package com.tripmind.api.controllers;

import com.tripmind.api.entities.Hotel;
import com.tripmind.api.services.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<List<Hotel>> getHotelsByDestination(@PathVariable String destinationId) {
        List<Hotel> response = hotelService.getHotelsByDestination(destinationId);
        return ResponseEntity.ok(response);
    }
}
