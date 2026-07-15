package com.tripmind.api.repositories;

import com.tripmind.api.entities.TransportMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransportModeRepository extends JpaRepository<TransportMode, Long> {
    List<TransportMode> findByRouteId(Long routeId);
}
