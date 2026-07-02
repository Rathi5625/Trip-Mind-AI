package com.tripmind.api.repositories;

import com.tripmind.api.entities.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(UUID userId);
    boolean existsByUserIdAndDestinationId(UUID userId, String destinationId);
    Optional<Wishlist> findByUserIdAndDestinationId(UUID userId, String destinationId);
}
