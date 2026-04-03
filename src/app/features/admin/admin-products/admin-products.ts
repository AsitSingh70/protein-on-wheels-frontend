import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.scss'],
})
export class AdminProductsComponent {
  products: any[] = [];

  newProduct: any = {
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    categoryId: 1
  };

  isEdit = false;
  editId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  // ✅ ADD
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  }

  // ✅ EDIT CLICK
  editProduct(p: any) {
    this.isEdit = true;
    this.editId = p.id;
    this.newProduct = { ...p };
  }

  // ✅ UPDATE
  updateProduct() {
    this.productService.updateProduct(this.editId!, this.newProduct).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  }

  // ✅ DELETE
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.newProduct = {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      categoryId: 1
    };
    this.isEdit = false;
    this.editId = null;
  }

}
