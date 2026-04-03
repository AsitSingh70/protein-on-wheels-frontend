import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.scss'],
})
export class AdminUsersComponent {
  users: any[] = [];
  apiUrl = environment.apiUrl;
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 50;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get(`${this.apiUrl}/Users`)
      .subscribe((res: any) => {
        this.users = res;
      });
  }

  get filteredUsers() {
    return this.users.filter((u: any) =>
      u.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
