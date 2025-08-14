package com.sports.scholarship.controller;

import com.sports.scholarship.entity.Scholarship;
import com.sports.scholarship.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "*")
public class ScholarshipController {
    
    @Autowired
    private ScholarshipService scholarshipService;
    
    @GetMapping
    public ResponseEntity<List<Scholarship>> getAllScholarships() {
        List<Scholarship> scholarships = scholarshipService.getAllActiveScholarships();
        return ResponseEntity.ok(scholarships);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Scholarship>> getAvailableScholarships() {
        List<Scholarship> scholarships = scholarshipService.getAvailableScholarships();
        return ResponseEntity.ok(scholarships);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable Long id) {
        Optional<Scholarship> scholarship = scholarshipService.getScholarshipById(id);
        return scholarship.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/sport/{sport}")
    public ResponseEntity<List<Scholarship>> getScholarshipsBySport(@PathVariable String sport) {
        List<Scholarship> scholarships = scholarshipService.getScholarshipsBySport(sport);
        return ResponseEntity.ok(scholarships);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Scholarship>> getScholarshipsByCategory(@PathVariable String category) {
        List<Scholarship> scholarships = scholarshipService.getScholarshipsByCategory(category);
        return ResponseEntity.ok(scholarships);
    }
    
    @PostMapping
    public ResponseEntity<Scholarship> createScholarship(@RequestBody Scholarship scholarship) {
        Scholarship createdScholarship = scholarshipService.createScholarship(scholarship);
        return ResponseEntity.ok(createdScholarship);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Scholarship> updateScholarship(@PathVariable Long id, @RequestBody Scholarship scholarship) {
        try {
            Scholarship updatedScholarship = scholarshipService.updateScholarship(id, scholarship);
            return ResponseEntity.ok(updatedScholarship);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScholarship(@PathVariable Long id) {
        try {
            scholarshipService.deleteScholarship(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateScholarship(@PathVariable Long id) {
        try {
            scholarshipService.deactivateScholarship(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
