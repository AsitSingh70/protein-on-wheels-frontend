import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtpComponent {
  email = '';
  otp = '';

  // after OTP success
  showRegisterForm = false;

  name = '';
  password = '';

  constructor(private auth: AuthService, private route: ActivatedRoute,private router: Router ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyOtp() {
    this.auth.verifyOtp(this.email.trim(), this.otp.trim()).subscribe({
      next: () => {
        alert('OTP Verified ✅');

        //REDIRECT AFTER SUCCESS
        this.showRegisterForm = true;
        // OR (better UX)
        // this.router.navigate(['/complete-register'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        console.log(err);
        alert(err.error || 'Invalid OTP');
      }
    });
  }

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: () => {
        alert('Registration Success ;)');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration Failed :(');
      }
    });
  }

}
