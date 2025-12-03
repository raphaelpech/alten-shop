import { Injectable, signal } from "@angular/core";
import { Product } from "./product.model";
import { Cart } from "./cart.model";

@Injectable({
    providedIn: "root"
}) export class CartService {

    private readonly _cart = signal<Cart>({ products: [], total: 0 });
    public readonly cart = this._cart.asReadonly();

    public getCartSize(): number {
        const products = this._cart().products || [];
        return products.reduce((sum, product) => sum + (product.quantity ?? 0), 0);
    }

    public addProductToCart(product: Product) {
        this._cart.update((currentCart) => {
            const existingItem = currentCart.products.find(
                (i) => i.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                currentCart.products.push(product);
            }

            currentCart.total += product.price * product.quantity;

            return currentCart;
        });
    }

    public removeProductFromCart(productId: number) {
        this._cart.update((currentCart) => {
            const item = currentCart.products.find((i) => i.id === productId);

            if (!item) return currentCart;

            const qty = item.quantity ?? 1;

            // Si quantité > 1, on décrémente, sinon on supprime l'article
            if (qty > 1) {
                item.quantity = qty - 1;
                currentCart.total = Math.max(0, currentCart.total - item.price);
            } else {
                currentCart.products = currentCart.products.filter(
                    (i) => i.id !== productId
                );
                currentCart.total = Math.max(0, currentCart.total - item.price * qty);
            }

            return currentCart;
        });
    }
     
}
