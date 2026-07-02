package com.tripmind.api.controllers;

import com.tripmind.api.entities.Restaurant;
import com.tripmind.api.services.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByDestination(@PathVariable String destinationId) {
        List<Restaurant> response = restaurantService.getRestaurantsByDestination(destinationId);
        return ResponseEntity.ok(response);
    }
}
