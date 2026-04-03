import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../features/products/banner/banner';
import { CategoryListComponent } from '../../features/products/category-list/category-list';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../../environments/environment'; 
import { FooterComponent } from '../../shared/footer/footer';
import { CartService } from '../../core/services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, BannerComponent, CategoryListComponent,FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit{ 
  apiUrl = environment.apiUrl;

  products: any[] = [];
  mostLiked: any[] = []; 
  youMayLike: any[] = []; 
  deals: any[] = []; 

  constructor(private http: HttpClient, private cartService: CartService, private router: Router) {} 

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get(`${this.apiUrl}/Products`)
      .subscribe((res: any) => {
        this.products = res;

        //shuffle function
        const shuffled = [...this.products].sort(() => 0.5 - Math.random());

        this.mostLiked = shuffled.slice(0, 5);
        this.youMayLike = shuffled.slice(0,5); 
        this.deals = shuffled.slice(0,5); 
        // this.mostLiked = shuffled.slice(0, 4);
        // this.youMayLike = shuffled.slice(4, 8); 
        // this.deals = shuffled.slice(8, 11); 
      });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe({
      next: () => alert('Added to cart ;)'),
      error: () => alert('Error adding to cart')
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

}
