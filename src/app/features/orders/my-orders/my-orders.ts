import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true; // 🟡 start loading
    this.http.get(`${this.apiUrl}/Orders/my-orders`)
      .subscribe({
        next: (res: any) => {
          this.orders = res;
          this.loading = false; // 🟡 stop loading
        },
        error: () => {
          this.orders = [];
          this.loading = false; // 🟡 stop loading even if error
        }
      });
  }

}
