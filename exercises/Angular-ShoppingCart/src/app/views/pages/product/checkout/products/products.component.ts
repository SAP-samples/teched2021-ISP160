import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../../../../../shared/models/product";
import { UserService } from "../../../../../shared/services/user.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  checkoutProducts: Product[];

  totalPrice = 0;
  constructor(
    productService: ProductService,
    private userService: UserService
  ) {
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const products = productService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach((product) => {
      this.totalPrice += Number(product.productPrice);
    });
    if (this.userService.user) {
      this.userService.user.totalPrice = this.totalPrice;
    } else {
      this.userService.user = { totalPrice: this.totalPrice };
    }
  }

  ngOnInit() {}
}
