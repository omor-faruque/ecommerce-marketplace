import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingBagComponent } from './components/shopping-bag/shopping-bag.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { checkoutGuard } from './guards/checkout.guard';

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "products", component: ProductsComponent },
  { path: "shopping-bag", component: ShoppingBagComponent },
  { path: "checkout", component: CheckoutComponent, canActivate: [checkoutGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
