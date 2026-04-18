import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-info',
  imports: [],
  templateUrl: './payment-info.html',
  styleUrl: './payment-info.scss',
})
export class PaymentInfoComponent {
  copied = false;

  copyUpi() {
    navigator.clipboard.writeText('8926362354@ybl');

    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

}
