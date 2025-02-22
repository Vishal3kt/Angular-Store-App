import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';
  private cartItems = new BehaviorSubject<any[]>(this.getCartItems());

  cartItems$ = this.cartItems.asObservable();

  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: any): void {
    let cart = this.getCartItems();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItems.next(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.getCartItems().filter(item => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItems.next(cart);
  }
}
