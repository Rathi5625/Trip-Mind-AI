package com.tripmind.api.services;

import com.tripmind.api.entities.Hotel;
import com.tripmind.api.repositories.HotelRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getHotelsByDestination(String destinationId) {
        return hotelRepository.findByDestinationId(destinationId);
    }
}
