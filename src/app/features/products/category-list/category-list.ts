import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryListComponent {
  constructor(private router: Router) {}

  goToCategory(id: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }

}
