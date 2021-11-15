import { Product } from "../../../../../shared/models/product";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../../../shared/models/user";
// import { AuthService } from "../../../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../../../shared/services/product.service";
import { map } from "rxjs/operators";
import { GigyaService } from "../../../../../shared/services/gigya/gigya.service";
import { UserService } from "../../../../../shared/services/user.service";

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"],
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User = new User();

  userDetail: UserDetail = new UserDetail();

  products: Product[];

  constructor(
    // authService: AuthService,
    private shippingService: ShippingService,
    productService: ProductService,
    private router: Router,
    private gigyaService: GigyaService,
    private userService: UserService
  ) {
    /* Hiding products Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    this.products = productService.getLocalCartProducts();

    // filling up form from user data
    this.gigyaService.account$.subscribe((account) => {
      if (account) {
        this.userDetail.firstName = account.profile.firstName;
        this.userDetail.lastName = account.profile.lastName;
        this.userDetails.emailId = account.profile.email;
        this.userDetail.zip = account.profile.zip;
      }
    });
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {
    const products = [];
    let totalPrice = 0;
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.productPrice;
      products.push(product);
    });

    this.userService.user.shipping = {
      first_name: this.userDetail.firstName,
      last_name: this.userDetail.lastName,
      address_1: this.userDetail.address1,
      address_2: this.userDetail.address2,
      state: this.userDetail.state,
      postcode: this.userDetail.zip,
      country: this.userDetail.country,
      email: this.userDetails.emailId,
    };

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } },
    ]);
  }
}
