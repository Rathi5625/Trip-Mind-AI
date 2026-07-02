package com.tripmind.api.services;

import java.util.UUID;
import com.tripmind.api.dtos.ReviewDto;
import com.tripmind.api.entities.Destination;
import com.tripmind.api.entities.Review;
import com.tripmind.api.entities.User;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.DestinationRepository;
import com.tripmind.api.repositories.ReviewRepository;
import com.tripmind.api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         UserRepository userRepository,
                         DestinationRepository destinationRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.destinationRepository = destinationRepository;
    }

    public List<ReviewDto> getReviewsByDestinationId(String destinationId) {
        return reviewRepository.findByDestinationId(destinationId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto createReview(UUID userId, ReviewDto reviewDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Destination destination = destinationRepository.findById(reviewDto.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        Review review = Review.builder()
                .user(user)
                .destination(destination)
                .rating(reviewDto.getRating())
                .comment(reviewDto.getComment())
                .build();

        Review savedReview = reviewRepository.save(review);
        return mapToDto(savedReview);
    }

    public ReviewDto mapToDto(Review r) {
        return ReviewDto.builder()
                .id(r.getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getName())
                .destinationId(r.getDestination().getId())
                .rating(r.getRating())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
