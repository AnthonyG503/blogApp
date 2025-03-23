package com.demo.crupapp.Services;

import com.demo.crupapp.Dto.BlogDto;
import java.util.List;

public interface BlogService {
    public BlogDto createBlog(BlogDto payload);
    public BlogDto updateBlog(BlogDto payload, Long id);
    public String deleteBlogById(Long id);
    public List<BlogDto> getAllBlogs();
}
