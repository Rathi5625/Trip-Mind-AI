package com.tripmind.api.services;

import java.util.UUID;
import com.tripmind.api.dtos.DestinationDto;
import com.tripmind.api.entities.Destination;
import com.tripmind.api.entities.User;
import com.tripmind.api.entities.Wishlist;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.DestinationRepository;
import com.tripmind.api.repositories.UserRepository;
import com.tripmind.api.repositories.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;

    public DestinationService(DestinationRepository destinationRepository,
                              WishlistRepository wishlistRepository,
                              UserRepository userRepository) {
        this.destinationRepository = destinationRepository;
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
    }

    public List<DestinationDto> getAllDestinations() {
        return destinationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public DestinationDto getDestinationById(String id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        return mapToDto(destination);
    }

    public List<DestinationDto> searchDestinations(String query) {
        List<Destination> directResults = destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(query, query);
        if (!directResults.isEmpty()) {
            return directResults.stream().map(this::mapToDto).collect(Collectors.toList());
        }

        // Typo correction fallback: Levenshtein distance comparison
        String normalizedQuery = query.toLowerCase().trim();
        List<Destination> all = destinationRepository.findAll();
        List<Destination> typoMatches = new ArrayList<>();

        for (Destination d : all) {
            String nameLower = d.getName().toLowerCase();
            String countryLower = d.getCountry().toLowerCase();

            if (calculateLevenshteinDistance(normalizedQuery, nameLower) <= 3 ||
                calculateLevenshteinDistance(normalizedQuery, countryLower) <= 3) {
                typoMatches.add(d);
            }
        }

        // Limit results to top 5 closest matches
        return typoMatches.stream()
                .limit(5)
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private int calculateLevenshteinDistance(String x, String y) {
        int[][] dp = new int[x.length() + 1][y.length() + 1];

        for (int i = 0; i <= x.length(); i++) {
            for (int j = 0; j <= y.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                        dp[i - 1][j - 1] + (x.charAt(i - 1) == y.charAt(j - 1) ? 0 : 1)
                    );
                }
            }
        }
        return dp[x.length()][y.length()];
    }

    public List<DestinationDto> getDestinationsByCategory(String category) {
        return destinationRepository.findByCategory(category).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean toggleWishlist(UUID userId, String destinationId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        var wishlistOpt = wishlistRepository.findByUserIdAndDestinationId(userId, destinationId);
        if (wishlistOpt.isPresent()) {
            wishlistRepository.delete(wishlistOpt.get());
            return false; // Removed from wishlist
        } else {
            Wishlist wishlist = Wishlist.builder()
                    .user(user)
                    .destination(destination)
                    .build();
            wishlistRepository.save(wishlist);
            return true; // Added to wishlist
        }
    }

    public List<DestinationDto> getUserWishlist(UUID userId) {
        return wishlistRepository.findByUserId(userId).stream()
                .map(wishlist -> mapToDto(wishlist.getDestination()))
                .collect(Collectors.toList());
    }

    public DestinationDto mapToDto(Destination d) {
        return DestinationDto.builder()
                .id(d.getId())
                .name(d.getName())
                .country(d.getCountry())
                .imageUrl(d.getImageUrl())
                .description(d.getDescription())
                .averageBudget(d.getAverageBudget())
                .averageBudgetValue(d.getAverageBudgetValue())
                .bestSeason(d.getBestSeason())
                .rating(d.getRating())
                .aiMatch(d.getAiMatch())
                .categories(d.getCategories())
                .weatherTemp(d.getWeatherTemp())
                .weatherText(d.getWeatherText())
                .safetyIndex(d.getSafetyIndex())
                .crowdScore(d.getCrowdScore())
                .build();
    }
}
