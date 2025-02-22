import { Component } from '@angular/core';
import { SearchService } from 'src/app/service/search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchQuery = '';

  constructor(private searchService: SearchService) { }

  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }
}
