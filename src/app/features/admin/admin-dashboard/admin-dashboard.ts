import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
})
export class AdminDashboardComponent {
  userName: string = '';
  greeting: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const user = this.auth.getUserDetails();
    this.userName = user?.name || 'Admin';

    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }
}
