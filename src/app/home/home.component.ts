import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../blog/blog.service';
import { Blog } from '../blog/blog.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm = '';
  welcomeMessage = '';

  constructor(
    private blogService: BlogService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
    this.fetchWelcomeMessage();
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
      this.filteredBlogs = data;
    });
  }

  fetchWelcomeMessage(): void {
    this.http.get('http://localhost:8080/welcome', { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.welcomeMessage = response;
        },
        error: (error) => {
          console.error('Error fetching welcome message:', error);
          this.welcomeMessage = 'Welcome! Something went wrong, but feel free to explore.';
        }
      });
  }

  searchBlogs(): void {
    const term = this.searchTerm.toLowerCase();
    if (term.trim() === '') {
      this.filteredBlogs = this.blogs;
    } else {
      this.filteredBlogs = this.blogs.filter(blog =>
        blog.username.toLowerCase().includes(term) ||
        blog.blogpost.toLowerCase().includes(term) ||
        (blog.category && blog.category.toLowerCase().includes(term))
      );
    }
  }

  createBlog(): void {
    this.router.navigate(['/create']);
  }

  editBlog(blog: Blog): void {
    this.router.navigate(['/create'], { state: { blog } });
  }

  deleteBlog(id?: number): void {
    if (id && confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.loadBlogs();
      });
    }
  }

  addComment(blog: Blog, comment: string): void {
    if (comment.trim()) {
      blog.comments = blog.comments || [];
      blog.comments.push(comment);
      this.blogService.updateBlog(blog.id!, blog).subscribe(() => {
        this.loadBlogs();
      });
    }
  }

  viewBlog(id?: number): void {
    if (id) {
      this.router.navigate(['/blog', id]);
    }
  }
}
