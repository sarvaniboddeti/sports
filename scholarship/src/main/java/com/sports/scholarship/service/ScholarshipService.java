package com.sports.scholarship.service;

import com.sports.scholarship.entity.Scholarship;
import com.sports.scholarship.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipService {
    
    @Autowired
    private ScholarshipRepository scholarshipRepository;
    
    public List<Scholarship> getAllActiveScholarships() {
        return scholarshipRepository.findByIsActiveTrue();
    }
    
    public List<Scholarship> getScholarshipsBySport(String sport) {
        return scholarshipRepository.findBySport(sport);
    }
    
    public List<Scholarship> getScholarshipsByCategory(String category) {
        return scholarshipRepository.findByCategory(category);
    }
    
    public List<Scholarship> getAvailableScholarships() {
        LocalDate today = LocalDate.now();
        return scholarshipRepository.findByIsActiveTrueAndApplicationDeadlineAfter(today);
    }
    
    public Optional<Scholarship> getScholarshipById(Long id) {
        return scholarshipRepository.findById(id);
    }
    
    public Scholarship createScholarship(Scholarship scholarship) {
        return scholarshipRepository.save(scholarship);
    }
    
    public Scholarship updateScholarship(Long id, Scholarship scholarshipDetails) {
        Scholarship scholarship = scholarshipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Scholarship not found"));
        
        scholarship.setTitle(scholarshipDetails.getTitle());
        scholarship.setDescription(scholarshipDetails.getDescription());
        scholarship.setSport(scholarshipDetails.getSport());
        scholarship.setCategory(scholarshipDetails.getCategory());
        scholarship.setAmount(scholarshipDetails.getAmount());
        scholarship.setApplicationDeadline(scholarshipDetails.getApplicationDeadline());
        scholarship.setStartDate(scholarshipDetails.getStartDate());
        scholarship.setEndDate(scholarshipDetails.getEndDate());
        scholarship.setEligibilityCriteria(scholarshipDetails.getEligibilityCriteria());
        scholarship.setRequiredDocuments(scholarshipDetails.getRequiredDocuments());
        scholarship.setActive(scholarshipDetails.isActive());
        
        return scholarshipRepository.save(scholarship);
    }
    
    public void deleteScholarship(Long id) {
        scholarshipRepository.deleteById(id);
    }
    
    public void deactivateScholarship(Long id) {
        Scholarship scholarship = scholarshipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Scholarship not found"));
        scholarship.setActive(false);
        scholarshipRepository.save(scholarship);
    }
}
