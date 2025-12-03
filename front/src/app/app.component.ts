import {
  Component,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from "primeng/dialog";
import { ShoppingCartComponent } from "./products/features/shopping-cart/shopping-cart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, BadgeModule, DialogModule, ShoppingCartComponent, PanelMenuComponent],
  providers: [CartService],
})
export class AppComponent {
  title = "ALTEN SHOP";

  private cartService = inject(CartService);
  
  public isCartDialogVisible = false;

  public get cart() {
    return this.cartService.cart();
  }

  public get cartSize() {
    return this.cartService.getCartSize();
  }

  openCartDialog() {
    this.isCartDialogVisible = true;
  }

}
