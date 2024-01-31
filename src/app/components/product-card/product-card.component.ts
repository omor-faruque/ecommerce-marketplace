import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product | undefined;
  quantity: number = 0;

  constructor(private cartservice:CartService){}

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  addToCart() {
    if (this.quantity > 0 && this.product) {
      const cartItem:CartItem = {
        product: this.product,
        quantity: this.quantity
      }
      this.cartservice.addToCart(cartItem);
      this.quantity=0;
    }
    
  }
}
