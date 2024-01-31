import { Address } from "./address";
import { CartItem } from "./cart-item";

export interface Order {
    guestFullName: string;
    guestEmail: string;
    cartItems: CartItem[];
    totalAmount: number;
    shippingAddress: Address;

}
