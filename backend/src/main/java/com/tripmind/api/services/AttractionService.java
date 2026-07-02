package com.tripmind.api.services;

import com.tripmind.api.entities.Attraction;
import com.tripmind.api.repositories.AttractionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AttractionService {

    private final AttractionRepository attractionRepository;

    public AttractionService(AttractionRepository attractionRepository) {
        this.attractionRepository = attractionRepository;
    }

    public List<Attraction> getAttractionsByDestination(String destinationId) {
        return attractionRepository.findByDestinationId(destinationId);
    }
}
