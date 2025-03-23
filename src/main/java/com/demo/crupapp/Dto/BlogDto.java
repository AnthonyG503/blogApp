package com.demo.crupapp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

//Model for blog and frontend
public class BlogDto {
    private Long id;
    private String username;
    private String blogpost;
    private String email;
    private Boolean terms;
}
