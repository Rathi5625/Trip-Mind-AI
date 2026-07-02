package com.tripmind.api.controllers;

import com.tripmind.api.dtos.ReviewDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByDestinationId(@PathVariable String destinationId) {
        List<ReviewDto> response = reviewService.getReviewsByDestinationId(destinationId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody ReviewDto reviewDto) {
        ReviewDto response = reviewService.createReview(userPrincipal.getId(), reviewDto);
        return ResponseEntity.ok(response);
    }
}
