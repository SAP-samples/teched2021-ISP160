import { Product } from "../../../../../shared/models/product";
import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Router } from "@angular/router";
import { WooCommerceService } from "../../../../../shared/services/wooCommerce/woo-commerce.service";
import { UserService } from "../../../../../shared/services/user.service";

declare var $: any;

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  products: Product[];
  date: number;
  totalPrice = 0;
  tax = 6.4;

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private wooCommerceService: WooCommerceService
  ) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.products = productService.getLocalCartProducts();

    this.products.forEach((product) => {
      this.totalPrice += Number(product.productPrice);
    });

    this.date = Date.now();
  }

  ngOnInit() {}

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("ikismail.pdf"); // Generated PDF
    });
  }

  purchaseMade() {
    const cartProducts = this.productService.getLocalCartProducts() || [];

    const data = {
      billing: { ...this.userService.user.billing },
      shipping: { ...this.userService.user.shipping },
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      line_items: this.createLineItems(cartProducts),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: this.userService.user.totalPrice,
        },
      ],
    };
    this.router.navigate(["/"]);
    console.log("purchase made", data);
    this.wooCommerceService.wooCommerceNewOrder(data);
    cartProducts.forEach((product) =>
      this.productService.removeLocalCartProduct(product)
    );
  }

  createLineItems(cartProducts) {
    return cartProducts.reduce((newArray, prod) => {
      const existItem = newArray.find(({ product_id }) => {
        return prod.productId === product_id;
      });
      if (existItem) {
        existItem.quantity += 1;
      } else {
        newArray.push({ product_id: prod.productId, quantity: 1 });
      }
      return newArray;
    }, []);
  }
}
