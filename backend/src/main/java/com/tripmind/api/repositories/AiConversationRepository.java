package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AiConversationRepository extends JpaRepository<AiConversation, Long> {
    List<AiConversation> findByTripIdOrderByCreatedAtAsc(UUID tripId);
}
