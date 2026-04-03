import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-reports.html',
  styleUrls: ['./admin-reports.scss'],
})
export class AdminReportsComponent {
  report: any = null;
  chart: any;
  topCustomers: any[] = [];

  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getReport();
  }

  getReport() {
    this.orderService.getReport(this.year, this.month)
      .subscribe((res: any) => {
        this.report = res;

        setTimeout(() => {
          this.createChart(); //create chart after data loads
        }, 100);
        this.orderService.getTopCustomers(this.year, this.month)
          .subscribe((res: any) => {
            this.topCustomers = res;
          });
      });
  }

  createChart() {

    //  destroy old chart (important)
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('statusChart', {
      type: 'line', //  changed to line
      data: {
        labels: ['Approved', 'Pending', 'Cancelled'],
        datasets: [
          {
            label: 'Order Status',
            data: [
              this.report.approved,
              this.report.pending,
              this.report.cancelled
            ],
            borderWidth: 2,
            fill: false,
            tension: 0.3 // smooth curve
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false //  control size
      }
    });
  }


}
