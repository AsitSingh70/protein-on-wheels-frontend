import { CanActivateFn, Router } from '@angular/router'; // 🆕
import { inject } from '@angular/core'; // 🆕
import { AuthService } from '../services/auth'; // 🆕

export const adminGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService); // 🆕
  const router = inject(Router);    // 🆕

  const token = auth.getToken(); // 🆕

  if (!token) {
    router.navigate(['/login']); // 🆕 not logged in
    return false;
  }

  // 🆕 decode JWT
  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload['role'];

  // ✅ allow only admin
  if (role === 'Admin') {
    return true;
  }

  // ❌ not admin → funny page 😈
  router.navigate(['/not-allowed']); // 🆕
  return false;
};