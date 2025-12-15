import { Injectable, signal, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Cart>({
    items: [],
    count: 0,
    total: 0,
    
  });


/*** Getting the Backend URL server from enviroment */

private readonly baseUrl = environment.endpoint;
private readonly http = inject (HttpClient);

  // function to increase product avalibleCount in database

  increaseProductQuantity( id: any){

   // alert("Estoy en cart-service - increaseProductQuantity - line 27 - id: "+id)

    return this.http.get(`${this.baseUrl}/api/product/increase-product-quantity/${id}`);

}

// function to increase product avalibleCount in database

decreaseProductQuantity( id: any){

  //alert("Estoy en cart-service - decreaseProductQuantity - line 37 - id: "+id)

  return this.http.get(`${this.baseUrl}/api/product/decrease-product-quantity/${id}`);

} 
  
  addItem(item: CartItem) {

   
    const itemObj = this.cart().items.find((t) => t.id === item.id);
    if (itemObj) {
      this.increaseItem(itemObj);
    } else {
      this.cart.update((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, item],
        count: prevCart.count + 1,
        total: prevCart.total + item.price,
      }));
    }
  
  }

  increaseItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = { ...prevCart, items: [...prevCart.items],};
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = itemObj!.quantity + 1;
      newCart.count++;
      newCart.total += itemObj!.price;
      return newCart;
    });
  }

  decreaseItem(item: CartItem) {
    
   // alert("Estoy en cart-service - decreaseItem - line 72 - id: "+item.id)

    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items],
      };
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = itemObj!.quantity - 1;
      newCart.count--;
      newCart.total -= itemObj!.price;
      return newCart;
    });
  }

  removeItem(item: CartItem) {


    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items.filter((t) => t.id !== item.id)],
      };
      const itemObj = prevCart.items.find((t) => t.id === item.id);
      newCart.count -= itemObj!.quantity;
      newCart.total -= itemObj!.price * itemObj!.quantity;
      return newCart;
    });
  }

  removeAllItems() {

    //alert("Estoy en cart-service - removeAllItems  - line 105 ")
    this.cart.update((prevCart) => {
      const newCart = {...prevCart,
        
        items: this.cart().items,
        count: this.cart().count,
        total: this.cart().total

      };
      newCart.count = 0; 
      newCart.total = 0;
      return newCart;
    });
}

}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: any;
  timedays: number;
  code: string; 
}

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}






