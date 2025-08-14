package com.sports.scholarship.controller;

import com.sports.scholarship.dto.ScholarshipApplicationDto;
import com.sports.scholarship.entity.ApplicationStatus;
import com.sports.scholarship.entity.ScholarshipApplication;
import com.sports.scholarship.service.ScholarshipApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Add this import if you have a custom exception, or use org.springframework.web.server.ResponseStatusException
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ScholarshipApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ScholarshipApplication> createApplication(
            @RequestParam Long userId,
            @RequestBody ScholarshipApplicationDto applicationDto) {
        // The service will throw an exception on failure, which the handler will catch.
        ScholarshipApplication application = applicationService.createApplication(userId, applicationDto);
        // Use 201 Created for successful POST requests.
        return ResponseEntity.status(HttpStatus.CREATED).body(application);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScholarshipApplication>> getUserApplications(@PathVariable Long userId) {
        List<ScholarshipApplication> applications = applicationService.getUserApplications(userId);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScholarshipApplication> getApplicationById(@PathVariable Long id) {
        // Use ResponseStatusException for not found
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found with id: " + id));
    }
    // Add missing endpoint for getScholarshipApplications
    @GetMapping("/scholarship/{scholarshipId}")
    public ResponseEntity<List<ScholarshipApplication>> getScholarshipApplications(@PathVariable Long scholarshipId) {
        List<ScholarshipApplication> applications = applicationService.getScholarshipApplications(scholarshipId);
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ScholarshipApplication> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String comments) {
        // The service will throw an exception if the application is not found.
        ScholarshipApplication application = applicationService.updateApplicationStatus(id, status, comments);
        return ResponseEntity.ok(application);
    }

    @DeleteMapping("/{id}/withdraw")
    public ResponseEntity<Void> withdrawApplication(@PathVariable Long id, @RequestParam Long userId) {
        // The service handles logic for checking ownership and validity.
        applicationService.withdrawApplication(id, userId);
        // Use 204 No Content for successful actions that don't return a body.
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ScholarshipApplication>> getApplicationsByStatus(@PathVariable ApplicationStatus status) {
        List<ScholarshipApplication> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }

    // Other endpoints like getScholarshipApplications remain the same...
}