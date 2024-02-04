import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenWidth = event.target.innerWidth;
    if (screenWidth > 690) {
      this.mobileMenuOpenClicked = false;
    }
  }



}
