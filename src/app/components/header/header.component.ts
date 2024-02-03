import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) { }

  noOfItems: number = 0;

  mobileMenuOpenClicked: boolean = false;

  ngOnInit(): void {
    this.cartService.cartItemsObservable.subscribe((data: any) => {
      this.noOfItems = data.totalItems;
    })
  }



}
