package com.tripmind.api.repositories;

import com.tripmind.api.entities.ActivityNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityNoteRepository extends JpaRepository<ActivityNote, Long> {
    List<ActivityNote> findByActivityId(Long activityId);
}
