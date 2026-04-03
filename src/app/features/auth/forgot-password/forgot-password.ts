import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  step = 1; // 🔥 control flow

  email = '';
  otp = '';
  newPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  // STEP 1 → SEND OTP
  sendOtp() {
    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        alert('OTP sent');
        this.step = 2; // 🔥 next step
      },
      error: () => alert('Error sending OTP')
    });
  }

  // STEP 2 → VERIFY OTP
  verifyOtp() {
    this.auth.verifyResetOtp(this.email, this.otp).subscribe({
      next: () => {
        alert('OTP verified');
        this.step = 3; // 🔥 next step
      },
      error: () => alert('Invalid OTP')
    });
  }

  // STEP 3 → RESET PASSWORD
  resetPassword() {
    this.auth.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        alert('Password reset successful');
        this.router.navigate(['/login']);
      },
      error: () => alert('Error resetting password')
    });
  }

}
