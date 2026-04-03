import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = environment.apiUrl;  //from env

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}/Products`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}/Products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/Products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/Products/${id}`, {
      responseType: 'text' 
    });
  }
}