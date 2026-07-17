package com.tripmind.api.repositories;

import com.tripmind.api.entities.AiHiddenGem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AiHiddenGemRepository extends JpaRepository<AiHiddenGem, Long> {
    List<AiHiddenGem> findByDestinationNameIgnoreCase(String destinationName);
}
