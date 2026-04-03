import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        alert('Login Success');

        this.router.navigate(['/']); // home
      },
      error: (err) => {
        const msg = err?.error; 
        alert(msg || 'Invalid credentials');
      }
    });
  }

}
