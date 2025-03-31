package com.demo.crupapp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "Blog_DB")
@AllArgsConstructor
@NoArgsConstructor
public class BlogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String blogpost;

    @Column
    private String email;

    @Column
    private Boolean terms;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column
    private String category;

    @ElementCollection
    @CollectionTable(name = "Blog_Comments", joinColumns = @JoinColumn(name = "blog_id"))
    @Column(name = "comment")
    private List<String> comments = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
