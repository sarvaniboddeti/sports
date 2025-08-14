package com.sports.scholarship.repository;

import com.sports.scholarship.entity.ScholarshipApplication;
import com.sports.scholarship.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScholarshipApplicationRepository extends JpaRepository<ScholarshipApplication, Long> {
    List<ScholarshipApplication> findByUser(User user);
    List<ScholarshipApplication> findByUserId(Long userId);
    List<ScholarshipApplication> findByScholarshipId(Long scholarshipId);
    boolean existsByUserIdAndScholarshipId(Long userId, Long scholarshipId);
}
