package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiPromptHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiPromptHistoryRepository extends JpaRepository<AiPromptHistory, Long> {
}
