package com.tripmind.api.services;

import com.tripmind.api.entities.Restaurant;
import com.tripmind.api.repositories.RestaurantRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getRestaurantsByDestination(String destinationId) {
        return restaurantRepository.findByDestinationId(destinationId);
    }
}
