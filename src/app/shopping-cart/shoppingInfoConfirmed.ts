import { Product } from '../product/product';

export class ShoppingInfo{
  cartItems : Product[];
  cartPrices: number[];
  totals: number;
  userIdentifier: string;
}