import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { CartService } from 'app/products/data-access/cart.service';
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { CardModule } from "primeng/card";
import { DecimalPipe } from '@angular/common';
import { Cart } from 'app/products/data-access/cart.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [DecimalPipe, ButtonModule, DataViewModule, CardModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingCartComponent {

  public readonly cartService = inject(CartService);
  cart = input.required<Cart>();
  
  public get products() {
    return this.cart().products;
  }

  public get total() {
    return this.cart().total;
  }

  public onDeleteFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }

}
