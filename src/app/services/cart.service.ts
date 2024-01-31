import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private totalAmount: number = 0;
  private totalItems: number = 0;

  private CART_ITEM_LS: string = "cartItems";
  private NO_OFITEMS_LS: string = "totalItems";

  constructor() {
    this.setPropertiesFromLocalStorage();
  }


  private cartSubject = new BehaviorSubject<{ cartItems: CartItem[]; totalAmount: number; totalItems: number }>({
    cartItems: this.cartItems,
    totalAmount: this.totalAmount,
    totalItems: this.totalItems
  });

  cartItemsObservable = this.cartSubject.asObservable();

  addToCart(item: CartItem) {
    const index = this.cartItems.findIndex(cartItem => cartItem.product.id == item.product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.totalAmount += item.product.price * item.quantity;
    this.totalItems += item.quantity;
    this.updateCartSubject();
  }

  removeFromCart(itemId: number) {
    const index = this.cartItems.findIndex(item => item.product.id == itemId);
    if (index !== -1) {
      const removedItem: CartItem = this.cartItems.splice(index, 1)[0];
      this.totalAmount -= removedItem.product.price * removedItem.quantity;
      this.totalItems -= removedItem.quantity;
      this.updateCartSubject();
    }
  }
  removeAllFromCart() {
    this.cartItems = [];
    this.totalAmount = 0;
    this.totalItems = 0;
    this.updateCartSubject();
  }

  private updateCartSubject() {
    this.cartSubject.next({
      cartItems: this.cartItems,
      totalAmount: this.totalAmount,
      totalItems: this.totalItems
    })

    localStorage.setItem(this.CART_ITEM_LS, JSON.stringify(this.cartItems));
    localStorage.setItem(this.NO_OFITEMS_LS, this.totalItems.toString());
  }


  private setPropertiesFromLocalStorage() {
    let cartItems = localStorage.getItem(this.CART_ITEM_LS);
    if (cartItems !== null) {
      this.cartItems = JSON.parse(cartItems);
    }

    let noOfItems = localStorage.getItem(this.NO_OFITEMS_LS);
    if (noOfItems !== null) {
      this.totalItems = Number(noOfItems);
    }

    this.cartItems.forEach(item => {
      this.totalAmount += item.product.price * item.quantity;
    });

    this.updateCartSubject();
  }

  doesCartHaveItems(): boolean {
    return this.cartItems.length > 0;
  }

}
