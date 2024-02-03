import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Address } from 'src/app/models/address';
import { CartItem } from 'src/app/models/cart-item';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;
  showshippingAddressForm:boolean=false;
  shippingAddress:Address={
    street: '',
    city: '',
    postalCode: '',
    country: 'Canada'
  };

  name: string = '';
  email: string = '';
  orderSubmitted:boolean=false;
  constructor(private cartService: CartService, private orderService: OrderService, private router:Router) {}
  ngOnInit(): void {
    this.cartService.cartItemsObservable
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      this.cartItems = data.cartItems;
      this.totalAmount = parseFloat(data.totalAmount);
      this.totalItems = data.totalItems;
    })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  continueAfterNameAndEmail() {
    if (this.name.trim().length !==0 && this.email.trim().length!==0) {
      this.showshippingAddressForm=true;

    } else {
      alert("Invalid information")
    }
  }

  submitOrderClicked(){
    const order:Order = {
      guestFullName: this.name,
      guestEmail: this.email,
      cartItems: this.cartItems,
      totalAmount: this.totalAmount,
      shippingAddress: this.shippingAddress
    }

    this.orderService.submitOrder(order)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((res:Order) => {
      this.orderSubmitted = true;
      this.resetCart();
    },
    (error) => {
      alert("Order was not submitted for error: "+error.message);
    })
  }

  resetCart() {
    this.cartService.removeAllFromCart();
  }

}
