import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss',
})
export class AdminOrdersComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res;
    });
  }

  approve(id: number) {
    this.orderService.updateStatus(id, 'Approved').subscribe(() => {
      this.loadOrders();
    });
  }

  cancel(id: number) {
    this.orderService.updateStatus(id, 'Cancelled').subscribe(() => {
      this.loadOrders();
    });
  }

}
