import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  placeOrder(data: any) {
    return this.http.post(`${this.apiUrl}/Orders/place`, data);
  }

  getOrders() {
    return this.http.get(`${this.apiUrl}/Orders`);
  }

  updateStatus(id: number, status: string) {
    return this.http.put(
      `${this.apiUrl}/Orders/update-status/${id}`,
      JSON.stringify(status), 
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }
    );
  }

  getReport(year: number, month: number) {
    return this.http.get(
      `${this.apiUrl}/Orders/report?year=${year}&month=${month}`
    );
  }

  getTopCustomers(year: number, month: number) {
    return this.http.get(`${this.apiUrl}/Orders/top-customers?year=${year}&month=${month}`);
  }
  
}
