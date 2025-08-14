package com.sports.scholarship.repository;

import com.sports.scholarship.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    List<Scholarship> findByIsActiveTrue();
    List<Scholarship> findBySport(String sport);
    List<Scholarship> findByCategory(String category);
    List<Scholarship> findByIsActiveTrueAndApplicationDeadlineAfter(java.time.LocalDate date);
}
