package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiOptimizationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiOptimizationResultRepository extends JpaRepository<AiOptimizationResult, Long> {
}
