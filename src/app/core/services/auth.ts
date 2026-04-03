import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // 🔹 LOGIN
  login(data: any) {
    return this.http.post(`${this.apiUrl}/Auth/login`, data);
  }

  // 🔹 SEND OTP
  // sendOtp(email: string) {
  //   return this.http.post(
  //     `${this.apiUrl}/Auth/send-otp?email=${encodeURIComponent(email)}`,
  //     {},
  //     { responseType: 'text' }
  //   );
  // }
  // // 🔹 SEND OTP
  sendOtp(email: string) {
    return this.http.post(
      `${this.apiUrl}/Auth/send-otp?email=${email}`,
      null,
      { responseType: 'text' }
    );
  }

  // 🔹 VERIFY OTP
  verifyOtp(email: string, otp: string) {
    return this.http.post(
      `${this.apiUrl}/Auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
      null,
      { responseType: 'text' }
    );
  }

  // 🔹 REGISTER
  register(data: any) {
    return this.http.post(
      `${this.apiUrl}/Auth/register`,
      data,
      { responseType: 'text' }
    );
  }



  // 🔹 SAVE TOKEN
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  // 🔹 GET TOKEN
  getToken() {
    return sessionStorage.getItem('token');
  }

  // 🔹 LOGOUT
  logout() {
    sessionStorage.removeItem('token');
  }

  // 🔹 CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 GET ROLE FROM TOKEN
  getRole(): string | null {
    const token: any = this.getToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role;
  }

  // 🔹 CHECK ADMIN
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  // 🔹 GET USER DETAILS for order
  getUserDetails() {
    const token: any = this.getToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);

    return {
      name: decoded.name || "User",
      email: decoded.email || "protineonwheels@gmail.com"
    };
  }

  // 🔹 Check user
  // forgotPassword(email: string) {
  //   return this.http.post(
  //     `${this.apiUrl}/Auth/forgot-password?email=${encodeURIComponent(email)}`,
  //     {},
  //     { responseType: 'text' }
  //   );
  // }
  forgotPassword(email: string) {
    return this.http.post(
      `${this.apiUrl}/Auth/forgot-password?email=${email}`,
      {},
      { responseType: 'text' }
    );
  }

  // 🔹 Verify reset OTP
  verifyResetOtp(email: string, otp: string) {
    return this.http.post(
      `${this.apiUrl}/Auth/verify-reset-otp?email=${email}&otp=${otp}`,
      {},
      { responseType: 'text' }
    );
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post(
      `${this.apiUrl}/Auth/reset-password?email=${email}&newPassword=${newPassword}`,
      {},
      { responseType: 'text' }
    );
  }

}
