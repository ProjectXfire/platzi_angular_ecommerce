import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Models
import { Product } from '@models/product';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  // Observables
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor() {}

  // Cart
  addToCart(product: Product) {
    const exist = this.myShoppingCart.find((prod) => prod.id === product.id);
    if (!exist) {
      this.myShoppingCart.push(product);
    }
    this.myCart.next(this.myShoppingCart);
  }
  removeToCart(products: Product[]) {
    this.myCart.next(products);
  }
  getTotalProducts() {
    return this.myShoppingCart;
  }
  getTotalPrice(): number {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
  setUser(user: User) {
    this.user.next(user);
  }
}
