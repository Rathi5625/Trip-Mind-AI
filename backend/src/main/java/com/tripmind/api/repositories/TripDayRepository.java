package com.tripmind.api.repositories;

import com.tripmind.api.entities.TripDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripDayRepository extends JpaRepository<TripDay, Long> {
}
