package com.sports.scholarship.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ScholarshipApplicationDto {
    
    private Long id;
    
    @NotNull(message = "Scholarship ID is required")
    private Long scholarshipId;
    
    @NotBlank(message = "Personal statement is required")
    private String personalStatement;
    
    @NotBlank(message = "Academic performance is required")
    private String academicPerformance;
    
    @NotBlank(message = "Sports achievements are required")
    private String sportsAchievements;
    
    @NotBlank(message = "Financial need description is required")
    private String financialNeed;
    
    private List<String> documents;
    
    public ScholarshipApplicationDto() {}
    
    public ScholarshipApplicationDto(Long scholarshipId, String personalStatement, 
                                   String academicPerformance, String sportsAchievements, String financialNeed) {
        this.scholarshipId = scholarshipId;
        this.personalStatement = personalStatement;
        this.academicPerformance = academicPerformance;
        this.sportsAchievements = sportsAchievements;
        this.financialNeed = financialNeed;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getScholarshipId() {
        return scholarshipId;
    }
    
    public void setScholarshipId(Long scholarshipId) {
        this.scholarshipId = scholarshipId;
    }
    
    public String getPersonalStatement() {
        return personalStatement;
    }
    
    public void setPersonalStatement(String personalStatement) {
        this.personalStatement = personalStatement;
    }
    
    public String getAcademicPerformance() {
        return academicPerformance;
    }
    
    public void setAcademicPerformance(String academicPerformance) {
        this.academicPerformance = academicPerformance;
    }
    
    public String getSportsAchievements() {
        return sportsAchievements;
    }
    
    public void setSportsAchievements(String sportsAchievements) {
        this.sportsAchievements = sportsAchievements;
    }
    
    public String getFinancialNeed() {
        return financialNeed;
    }
    
    public void setFinancialNeed(String financialNeed) {
        this.financialNeed = financialNeed;
    }
    
    public List<String> getDocuments() {
        return documents;
    }
    
    public void setDocuments(List<String> documents) {
        this.documents = documents;
    }
}
