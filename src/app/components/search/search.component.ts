import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { SearchService } from 'src/app/service/search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchQuery = '';
  suggestions: any[] = [];

  constructor(private searchService: SearchService, private apiService: ApiService) { }

  onSearch() {
    if (this.searchQuery.length > 0) {
      this.apiService.getAllProducts().subscribe((products) => {
        this.suggestions = products.filter(product =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        ).slice(0, 5);
      });
    } else {
      this.suggestions = [];
    }
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  selectSuggestion(product: any) {
    this.searchQuery = product.title;
    this.suggestions = [];
    this.searchService.updateSearchQuery(product.title);
  }

  clearSearch() {
    this.searchQuery = '';
    this.suggestions = [];
    this.searchService.updateSearchQuery('');
  }

}
