package com.tripmind.api.repositories;

import com.tripmind.api.entities.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, String> {
    List<Destination> findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(String name, String country);

    @Query("SELECT d FROM Destination d JOIN d.categories c WHERE c = :category")
    List<Destination> findByCategory(@Param("category") String category);
}
