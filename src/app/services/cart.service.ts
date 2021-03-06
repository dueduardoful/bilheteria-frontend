import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();



  constructor() { }

  addToCart(theCartItem: CartItem){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0){


      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if(alreadyExistsInCart){
      existingCartItem.quantidade++;

    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();


  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
        totalPriceValue += currentCartItem.quantidade* currentCartItem.preco;
        totalQuantityValue += currentCartItem.quantidade;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantidade*tempCartItem.preco;
      console.log(`name: ${tempCartItem.nome}, quantity=${tempCartItem.quantidade}, unitPrice=${tempCartItem.preco}, subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('------');
  }

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantidade--;
  }

}
