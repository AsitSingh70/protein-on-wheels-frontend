
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService,private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getMyCart().subscribe((res: any) => {
      this.cartItems = res;

      //calculate total
      this.total = 0;
      this.cartItems.forEach(item => {
        this.total += item.product.price * item.quantity;
      });
    });
  }

  remove(id: number) {
    this.cartService.removeItem(id).subscribe(() => {
      this.loadCart();
    });
  }

  placeOrder() {
    this.router.navigate(['/checkout']);
  }

}
