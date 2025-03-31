import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog/blog.service';
import { Blog } from '../blog/blog.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getAllBlogs().subscribe((blogs) => {
        this.blog = blogs.find(b => b.id === +id) || null;
        if (!this.blog) {
          this.router.navigate(['/']); // Redirect if blog not found
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  editBlog(): void {
    if (this.blog) {
      this.router.navigate(['/create'], { state: { blog: this.blog } });
    }
  }

  deleteBlog(): void {
    if (this.blog && this.blog.id && confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(this.blog.id).subscribe(() => {
        this.router.navigate(['/']); // Redirect to homepage after deletion
      });
    }
  }
}
