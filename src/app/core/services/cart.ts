import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addToCart(productId: number) {

    const body = {
      productId: productId,
      quantity: 1
    };

    return this.http.post(`${this.apiUrl}/Cart/add`, body);
  }

  getMyCart() {
    return this.http.get(`${this.apiUrl}/Cart/my-cart?time=${new Date().getTime()}`);
  }

  removeItem(id: number) {
    return this.http.delete(
      `${this.apiUrl}/Cart/${id}`,
      { responseType: 'text' }
    );
  }

  placeOrder() {
    return this.http.post(`${this.apiUrl}/Orders/place`, {});
  }
  
}
