import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent implements OnInit {

  relatedProducts: any[] = [];
  product: any;
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) { }

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');

  //   //get current product
  //   this.http.get(`${this.apiUrl}/Products/${id}`)
  //     .subscribe((res: any) => {
  //       this.product = res;


  //       //after getting product → load related
  //       this.loadRelatedProducts();
  //     });
  // }

  ngOnInit() {

    // 🔥 listen to route changes (fix)
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      this.product = null; // 🔥 reset so skeleton shows

      this.http.get(`${this.apiUrl}/Products/${id}`)
        .subscribe((res: any) => {
          this.product = res;

          this.loadRelatedProducts();
        });

    });

  }

  addToCart() {
    this.cartService.addToCart(this.product.id).subscribe(() => {
      alert('Added to cart ;)');
    });
  }

  getUsage() {
    if (!this.product) return '';

    if (this.product.categoryId === 1)
      return 'Mix 1 scoop of protein powder with water or milk and consume after your workout. It helps in muscle recovery, supports muscle growth, and provides essential nutrients needed after intense exercise.';

    if (this.product.categoryId === 2)
      return 'Take 5g of creatine daily with water, preferably after your workout or at any fixed time. It helps improve strength, increases energy levels, and enhances overall workout performance over time.';

    if (this.product.categoryId === 3)
      return 'Take this pre-workout supplement 20–30 minutes before your workout. It boosts energy, improves focus, and helps you perform better during intense training sessions.';

    return 'Use this product as per your daily requirement or as recommended. It is designed to support your fitness goals and improve overall performance.';
  }

  loadRelatedProducts() {
    this.http.get(`${this.apiUrl}/Products`)
      .subscribe((res: any) => {

        this.relatedProducts = res
          .filter((p: any) =>
            p.categoryId === this.product.categoryId && // same category
            p.id !== this.product.id // not same product
          )
          .slice(0, 4); // only 4 products

      });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
