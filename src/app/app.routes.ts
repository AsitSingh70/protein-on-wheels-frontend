import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { VerifyOtpComponent } from './features/auth/verify-otp/verify-otp';
import { RegisterComponent } from './features/auth/register/register';
import { ProductListComponent } from './features/products/product-list/product-list';
import { CartPageComponent } from './features/cart/cart-page/cart-page';
import { CheckoutComponent } from './features/orders/checkout/checkout';
import { MyOrdersComponent } from './features/orders/my-orders/my-orders';
import { HomeComponent } from './features/home/home';
import { ProductDetailComponent } from './features/products/product-detail/product-detail';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminProductsComponent } from './features/admin/admin-products/admin-products';
import { AdminOrdersComponent } from './features/admin/admin-orders/admin-orders';
import { AdminReportsComponent } from './features/admin/admin-reports/admin-reports';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users';
import { adminGuard } from './core/guards/admin-guard';
import { PaymentInfoComponent } from './features/payment/payment-info/payment-info';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'verify-otp', component: VerifyOtpComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'my-orders', component: MyOrdersComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [adminGuard] },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [adminGuard] },
    { path: 'admin/reports', component: AdminReportsComponent, canActivate: [adminGuard] },
    { path: 'admin/users', component: AdminUsersComponent, canActivate: [adminGuard] },
    { path: 'payment-info', component: PaymentInfoComponent },

    { path: 'not-allowed', loadComponent: () => import('./features/not-allowed/not-allowed').then(m => m.NotAllowedComponent) }, 
    

];
