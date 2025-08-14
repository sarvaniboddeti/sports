package com.sports.scholarship.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scholarship_applications")
public class ScholarshipApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "scholarship_id", nullable = false)
    private Scholarship scholarship;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String personalStatement;
    
    @NotBlank
    private String academicPerformance;
    
    @NotBlank
    private String sportsAchievements;
    
    @NotBlank
    private String financialNeed;
    
    @ElementCollection
    @CollectionTable(name = "application_documents", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "document_url")
    private List<String> documents = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;
    
    private String reviewerComments;
    
    @NotNull
    private LocalDateTime applicationDate = LocalDateTime.now();
    
    private LocalDateTime reviewDate;
    
    public ScholarshipApplication() {}
    
    public ScholarshipApplication(User user, Scholarship scholarship, String personalStatement, 
                                String academicPerformance, String sportsAchievements, String financialNeed) {
        this.user = user;
        this.scholarship = scholarship;
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
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Scholarship getScholarship() {
        return scholarship;
    }
    
    public void setScholarship(Scholarship scholarship) {
        this.scholarship = scholarship;
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
    
    public ApplicationStatus getStatus() {
        return status;
    }
    
    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
    
    public String getReviewerComments() {
        return reviewerComments;
    }
    
    public void setReviewerComments(String reviewerComments) {
        this.reviewerComments = reviewerComments;
    }
    
    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }
    
    public void setApplicationDate(LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }
    
    public LocalDateTime getReviewDate() {
        return reviewDate;
    }
    
    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }
}
