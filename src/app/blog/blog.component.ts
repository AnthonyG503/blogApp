import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from './blog.service';
import { Blog } from './blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  selectedBlog: Blog = { username: '', blogpost: '', email: '', terms: false };
  isEditMode = false;
  expandedBlogId: number | null | undefined = null; // include undefined ("id?")

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.selectedBlog.id) {
      this.blogService.updateBlog(this.selectedBlog.id, this.selectedBlog).subscribe(() => {
        this.loadBlogs();
        this.resetForm();
      });
    } else {
      this.blogService.createBlog(this.selectedBlog).subscribe(() => {
        this.loadBlogs();
        this.resetForm();
      });
    }
  }
    //CRUD features
    
  editBlog(blog: Blog): void {
    this.selectedBlog = { ...blog };
    this.isEditMode = true;
    this.expandedBlogId = null;
  }

  deleteBlog(id?: number): void {
    if (id) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.loadBlogs();
        this.expandedBlogId = null;
      });
    }
  }

  resetForm(): void {
    this.selectedBlog = { username: '', blogpost: '', email: '', terms: false };
    this.isEditMode = false;
  }

  toggleExpand(blogId?: number): void {
    this.expandedBlogId = this.expandedBlogId === blogId ? null : blogId;
  }
}
