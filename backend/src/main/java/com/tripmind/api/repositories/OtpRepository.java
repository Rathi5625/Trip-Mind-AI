package com.tripmind.api.repositories;

import com.tripmind.api.entities.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findFirstByEmailAndTypeOrderByExpiresAtDesc(String email, String type);
    void deleteByEmailAndType(String email, String type);
}
