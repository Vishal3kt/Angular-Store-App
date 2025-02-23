import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems = new BehaviorSubject<CartItem[]>(this.getCartItems());

  cartItems$ = this.cartItems.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: CartItem): void {
    let cart = this.getCartItems();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      this.snackBar.open('Already added to cart', 'Close', { duration: 2000 });
      return;
    }

    cart.push({ ...product, quantity: 1 });
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItems.next(cart);
    this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
  }

  removeFromCart(productId: number): void {
    let cart = this.getCartItems().filter(item => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItems.next(cart);
  }
}
