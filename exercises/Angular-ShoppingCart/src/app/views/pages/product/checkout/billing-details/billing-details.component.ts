import { ProductService } from "../../../../../shared/services/product.service";
import { Product } from "../../../../../shared/models/product";
import { BillingService } from "../../../../../shared/services/billing.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, UserDetail } from "../../../../../shared/models/user";
// import { AuthService } from "../../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { GigyaService } from "../../../../../shared/services/gigya/gigya.service";
import { UserService } from "../../../../../shared/services/user.service";

@Component({
  selector: "app-billing-details",
  templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"],
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User = new User();
  products: Product[];
  userDetail: UserDetail = new UserDetail();

  constructor(
    productService: ProductService,
    private router: Router,
    private gigyaService: GigyaService,
    private userService: UserService
  ) {
    /* Hiding Shipping Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "block";
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
    let totalPrice = 0;
    const products = [];
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.productPrice;
      products.push(product);
    });

    this.userService.user.billing = {
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
      { outlets: { checkOutlet: ["result"] } },
    ]);
  }
}
