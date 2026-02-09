package com.aidkido.repository;

import com.aidkido.model.ScreenTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ScreenTimeRepository
        extends JpaRepository<ScreenTime, Long> {

    Optional<ScreenTime> findByUserIdAndDate(Long userId, LocalDate date);
}

