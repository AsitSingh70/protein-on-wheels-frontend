import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  searchText: string = '';
  allProducts: any[] = [];
  filteredProducts: any[] = [];


  constructor(public auth: AuthService, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    //load all products once
    this.productService.getProducts().subscribe((res: any) => {
      this.allProducts = res;
    });
  }

  // search logic
  onSearch() {
    const text = this.searchText.toLowerCase();

    if (!text) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.allProducts.filter((p: any) =>
      p.name.toLowerCase().includes(text)
    );
  }
  goToProduct(id: number) {
    this.searchText = '';
    this.filteredProducts = [];
    this.router.navigate(['/product', id]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  

}
