package com.demo.crupapp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {
    private Long id;
    private String username;
    private String blogpost;
    private String email;
    private Boolean terms;
    private LocalDateTime createdAt;
    private String category;
    private List<String> comments;
}