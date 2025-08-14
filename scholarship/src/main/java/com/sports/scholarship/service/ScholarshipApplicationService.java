package com.sports.scholarship.service;

import com.sports.scholarship.dto.ScholarshipApplicationDto;
import com.sports.scholarship.entity.ApplicationStatus;
import com.sports.scholarship.entity.Scholarship;
import com.sports.scholarship.entity.ScholarshipApplication;
import com.sports.scholarship.entity.User;
import com.sports.scholarship.repository.ScholarshipApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipApplicationService {
    
    @Autowired
    private ScholarshipApplicationRepository applicationRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ScholarshipService scholarshipService;
    
    public ScholarshipApplication createApplication(Long userId, ScholarshipApplicationDto applicationDto) {
        User user = userService.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Scholarship scholarship = scholarshipService.getScholarshipById(applicationDto.getScholarshipId())
            .orElseThrow(() -> new RuntimeException("Scholarship not found"));
        
        // Check if user has already applied for this scholarship
        if (applicationRepository.existsByUserIdAndScholarshipId(userId, applicationDto.getScholarshipId())) {
            throw new RuntimeException("You have already applied for this scholarship");
        }
        
        ScholarshipApplication application = new ScholarshipApplication(
            user,
            scholarship,
            applicationDto.getPersonalStatement(),
            applicationDto.getAcademicPerformance(),
            applicationDto.getSportsAchievements(),
            applicationDto.getFinancialNeed()
        );
        
        if (applicationDto.getDocuments() != null) {
            application.setDocuments(applicationDto.getDocuments());
        }
        
        return applicationRepository.save(application);
    }
    
    public List<ScholarshipApplication> getUserApplications(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    public List<ScholarshipApplication> getScholarshipApplications(Long scholarshipId) {
        return applicationRepository.findByScholarshipId(scholarshipId);
    }
    
    public Optional<ScholarshipApplication> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
    
    public ScholarshipApplication updateApplicationStatus(Long applicationId, ApplicationStatus status, String comments) {
        ScholarshipApplication application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(status);
        application.setReviewerComments(comments);
        application.setReviewDate(LocalDateTime.now());
        
        return applicationRepository.save(application);
    }
    
    public void withdrawApplication(Long applicationId, Long userId) {
        ScholarshipApplication application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        
        if (!application.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only withdraw your own applications");
        }
        
        application.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepository.save(application);
    }
    
    public List<ScholarshipApplication> getApplicationsByStatus(ApplicationStatus status) {
        return applicationRepository.findAll().stream()
            .filter(app -> app.getStatus() == status)
            .toList();
    }
}
