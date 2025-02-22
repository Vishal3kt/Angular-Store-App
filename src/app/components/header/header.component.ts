import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { SearchService } from 'src/app/service/search-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount = 0;
  searchQuery = '';

  constructor(private cartService: CartService, private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      console.log('Search Query from Header:', query);
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
