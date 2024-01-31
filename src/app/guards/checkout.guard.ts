import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const checkoutGuard: CanActivateFn = (route, state) => {

  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.doesCartHaveItems()) {
    return true;
  }
  return router.parseUrl('/shopping-bag');
  // or any of this 
  // return router.navigate(['products']);
  // return router.navigateByUrl('products');
};
