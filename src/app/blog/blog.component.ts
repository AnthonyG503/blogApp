import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from './blog.service';
import { Blog } from './blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  selectedBlog: Blog = { username: '', blogpost: '', email: '', terms: false, category: '' };
  isEditMode = false;
  formSubmitted = false;
  categories = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Other'];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    const state = history.state as { blog: Blog };
    if (state?.blog) {
      this.selectedBlog = { ...state.blog };
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.selectedBlog.username && this.selectedBlog.blogpost && this.selectedBlog.email) {
      if (this.isEditMode && this.selectedBlog.id) {
        this.blogService.updateBlog(this.selectedBlog.id, this.selectedBlog).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.blogService.createBlog(this.selectedBlog).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  resetForm(): void {
    this.router.navigate(['/']); // Navigate back to homepage instead of clearing form
  }
}
