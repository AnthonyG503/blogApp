package com.demo.crupapp.Services;

import com.demo.crupapp.BlogRepository;
import com.demo.crupapp.Dto.BlogDto;
import com.demo.crupapp.Entities.BlogEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogImpl implements BlogService {

    //implements the blog service interface

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public BlogDto createBlog(BlogDto payload) {
        BlogEntity blog = convertToEntity(payload);
        BlogEntity savedEntity = blogRepository.save(blog);
        return convertToDto(savedEntity);
    }

    @Override
    public BlogDto updateBlog(BlogDto payload, Long id) {
        BlogEntity blogEnt = blogRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Blog with ID " + id + " not found"));
        blogEnt.setBlogpost(payload.getBlogpost());
        blogEnt.setEmail(payload.getEmail());
        blogEnt.setUsername(payload.getUsername());
        blogEnt.setTerms(payload.getTerms());

        BlogEntity blog = blogRepository.save(blogEnt);
        return convertToDto(blog);
    }

    @Override
    public String deleteBlogById(Long id) {
        BlogEntity blog = blogRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Blog with ID " + id + " not found"));
        blogRepository.delete(blog);
        return "The blog with ID " + id + " has been deleted";
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<BlogEntity> blogs = blogRepository.findAll();
        return blogs.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public BlogEntity convertToEntity(BlogDto payload) {
        BlogEntity entity = new BlogEntity();
        entity.setBlogpost(payload.getBlogpost());
        entity.setEmail(payload.getEmail());
        entity.setTerms(payload.getTerms());
        entity.setUsername(payload.getUsername());
        entity.setId(payload.getId());
        return entity;
    }

    public BlogDto convertToDto(BlogEntity entity) {
        BlogDto blogDto = new BlogDto();
        blogDto.setId(entity.getId());
        blogDto.setBlogpost(entity.getBlogpost());
        blogDto.setEmail(entity.getEmail());
        blogDto.setTerms(entity.getTerms());
        blogDto.setUsername(entity.getUsername());
        return blogDto;
    }
}
