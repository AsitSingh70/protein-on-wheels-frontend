import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent {
  categoryId: number = 0;
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'];

      this.loadProducts();
    });
  }
  loadProducts() {
    this.productService.getProducts().subscribe((res: any) => {

      if (this.categoryId) {
        this.products = res.filter((p: any) => p.categoryId === this.categoryId);
      } else {
        this.products = res;
      }

    });
  }


  addToCart(productId: number) {

    // check login
    if (!this.auth.isLoggedIn()) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(productId).subscribe({
      next: () => {
        alert('Added to cart ;)');
      },
      error: (err) => {
        console.log(err);
        alert('Error adding to cart,try after some time :(');
      }
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  handleAddToCart(p: any, event: Event) {
    event.stopPropagation();

    this.addToCart(p.id); // your existing function

    p.added = true;

    setTimeout(() => {
      p.added = false;
    }, 1000);
  }

}
