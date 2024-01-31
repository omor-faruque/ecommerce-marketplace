import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService, private router: Router) { }


  ngOnInit(): void {
    this.cartService.cartItemsObservable
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      this.cartItems = data.cartItems;
      this.totalAmount =parseFloat(data.totalAmount);
      this.totalItems = data.totalItems;
    })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  deleteProduct(id: number) {
    this.cartService.removeFromCart(id);
  }


}
