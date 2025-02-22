import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SearchService } from 'src/app/service/search-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  loadingProducts = false;
  loadingCategories = true;
  searchPerformed = false; // Track if a search was performed

  constructor(
    private apiService: ApiService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.searchService.searchQuery$.subscribe(query => {
      if (query) {
        this.searchPerformed = true;
        this.filterProducts(query);
      } else {
        this.searchPerformed = false;
        this.filteredProducts = [...this.products]; // Reset to category products
      }
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.loadingCategories = false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.loadingCategories = false;
      }
    );
  }

  selectCategory(category: string) {
    this.loadingProducts = true;
    this.searchPerformed = false; // Reset search flag when selecting category

    this.apiService.getProductsByCategory(category).subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products; // Show products by category
        this.loadingProducts = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loadingProducts = false;
      }
    );
  }

  filterProducts(query: string) {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
