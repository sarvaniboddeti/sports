package com.sports.scholarship.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "scholarships")
public class Scholarship {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 200)
    private String title;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    @Size(max = 100)
    private String sport;
    
    @NotBlank
    @Size(max = 100)
    private String category;
    
    @NotNull
    @Positive
    private BigDecimal amount;
    
    @NotNull
    private LocalDate applicationDeadline;
    
    @NotNull
    private LocalDate startDate;
    
    @NotNull
    private LocalDate endDate;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String eligibilityCriteria;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String requiredDocuments;
    
    private boolean isActive = true;
    
    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL)
    private Set<ScholarshipApplication> applications = new HashSet<>();
    
    public Scholarship() {}
    
    public Scholarship(String title, String description, String sport, String category, 
                      BigDecimal amount, LocalDate applicationDeadline, LocalDate startDate, 
                      LocalDate endDate, String eligibilityCriteria, String requiredDocuments) {
        this.title = title;
        this.description = description;
        this.sport = sport;
        this.category = category;
        this.amount = amount;
        this.applicationDeadline = applicationDeadline;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eligibilityCriteria = eligibilityCriteria;
        this.requiredDocuments = requiredDocuments;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getSport() {
        return sport;
    }
    
    public void setSport(String sport) {
        this.sport = sport;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }
    
    public void setApplicationDeadline(LocalDate applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public String getEligibilityCriteria() {
        return eligibilityCriteria;
    }
    
    public void setEligibilityCriteria(String eligibilityCriteria) {
        this.eligibilityCriteria = eligibilityCriteria;
    }
    
    public String getRequiredDocuments() {
        return requiredDocuments;
    }
    
    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
    
    public Set<ScholarshipApplication> getApplications() {
        return applications;
    }
    
    public void setApplications(Set<ScholarshipApplication> applications) {
        this.applications = applications;
    }
}
