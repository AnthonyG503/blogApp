package com.demo.crupapp.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="blog_DB") //blog database
@AllArgsConstructor
@NoArgsConstructor
public class BlogEntity {

    //getters and setters using lombok for entity (blog)

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


}
