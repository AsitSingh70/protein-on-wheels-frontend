import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  email = '';

  constructor(private auth: AuthService, private router: Router) { }

  sendOtp() {
    this.auth.sendOtp(this.email).subscribe({
      next: () => {
        console.log("OTP success");
        alert('OTP sent (check email)');
        this.router.navigate(['/verify-otp'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        console.log("ERROR BLOCK", err);

        const message = err.error;

        // HANDLE the error CASE
        if (message) {
          alert(message);
          // 🚨 IF USER ALREADY EXISTS → GO TO LOGIN
          if (message.includes("already exists")) {
            this.router.navigate(['/login']);
          }
          else{
            this.router.navigate(['/verify-otp'], { queryParams: { email: this.email } });
          }
          
        } else {
          alert('Error sending OTP');
        }
      }
    });
  }

}
