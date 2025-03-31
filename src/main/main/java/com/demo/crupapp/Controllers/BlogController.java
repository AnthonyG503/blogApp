package com.demo.crupapp.Controllers;

import com.demo.crupapp.Dto.BlogDto;
import com.demo.crupapp.Services.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
@CrossOrigin(origins = {"http://localhost:4200"}) //frontend connection
public class BlogController {

    @Autowired
    public BlogService blogService;

    // mapping for frontend and CRUD features

    @PostMapping("/create")
    public ResponseEntity<BlogDto> createBlog(@RequestBody BlogDto dto) {
        BlogDto blog = blogService.createBlog(dto);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BlogDto> updateBlog(@PathVariable Long id, @RequestBody BlogDto dto) {
        BlogDto updatedBlog = blogService.updateBlog(dto, id);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        String message = blogService.deleteBlogById(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogDto>> getAllBlogs() {
        List<BlogDto> blogs = blogService.getAllBlogs();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
}
