import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { OrderService } from '../../../core/services/order';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent implements OnInit {
  user: any;
  phoneNumber: string = '';
  address: string = '';

  orderSuccess = false;

  //added on 02-05-26
  // 🔥 NEW VARIABLES
  showScratch = false;
  gift: string = '';
  isScratched = false;



  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.auth.getUserDetails();
  }

  placeOrder() {
    if (!this.phoneNumber || !this.address) {
      alert("Phone and Address required");
      return;
    }

    const data = {
      phoneNumber: this.phoneNumber,
      address: this.address
    };

    //added on 02-05-26
    this.orderService.placeOrder(data).subscribe({
      next: (res: any) => {

        // 🔥 GET GIFT FROM BACKEND
        this.gift = res.giftAssigned;

        // 🔥 SHOW SUCCESS ANIMATION
        this.showSuccess();

        // 🔥 AFTER 2 SEC → SHOW SCRATCH
        setTimeout(() => {
          this.orderSuccess = false;
          this.showScratch = true;
        }, 2000);

        // 🔥 AFTER 5 SEC → REDIRECT HOME
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 13000);

      },
      error: () => {
        alert("Error placing order");
      }
    });

    // this.orderService.placeOrder(data).subscribe({
    //   next: () => {
    //     // alert("Order placed successfully");

    //     this.showSuccess();
    //     // DELAY NAVIGATION (IMPORTANT)
    //     setTimeout(() => {
    //       this.router.navigate(['/']);
    //     }, 2000); // 2 sec delay
    //   },
    //   error: () => {
    //     alert("Error placing order");
    //   }
    // });
  }



  showSuccess() {
    this.orderSuccess = true;

    setTimeout(() => {
      this.orderSuccess = false;
    }, 2500);
  }
}
