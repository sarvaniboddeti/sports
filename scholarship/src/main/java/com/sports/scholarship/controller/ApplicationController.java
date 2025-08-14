package com.sports.scholarship.controller;

import com.sports.scholarship.dto.ScholarshipApplicationDto;
import com.sports.scholarship.entity.ApplicationStatus;
import com.sports.scholarship.entity.ScholarshipApplication;
import com.sports.scholarship.service.ScholarshipApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {
    
    @Autowired
    private ScholarshipApplicationService applicationService;
    
    @PostMapping
    public ResponseEntity<?> createApplication(@RequestParam Long userId, @RequestBody ScholarshipApplicationDto applicationDto) {
        try {
            ScholarshipApplication application = applicationService.createApplication(userId, applicationDto);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScholarshipApplication>> getUserApplications(@PathVariable Long userId) {
        List<ScholarshipApplication> applications = applicationService.getUserApplications(userId);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/scholarship/{scholarshipId}")
    public ResponseEntity<List<ScholarshipApplication>> getScholarshipApplications(@PathVariable Long scholarshipId) {
        List<ScholarshipApplication> applications = applicationService.getScholarshipApplications(scholarshipId);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScholarshipApplication> getApplicationById(@PathVariable Long id) {
        Optional<ScholarshipApplication> application = applicationService.getApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ScholarshipApplication> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String comments) {
        try {
            ScholarshipApplication application = applicationService.updateApplicationStatus(id, status, comments);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<Void> withdrawApplication(@PathVariable Long id, @RequestParam Long userId) {
        try {
            applicationService.withdrawApplication(id, userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ScholarshipApplication>> getApplicationsByStatus(@PathVariable ApplicationStatus status) {
        List<ScholarshipApplication> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }
}
