import { Component, OnInit } from "@angular/core";
import { WooCommerceService } from "../../../shared/services/wooCommerce/woo-commerce.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList;

  constructor(private wooCommerceService: WooCommerceService) {}

  ngOnInit() {
    this.wooCommerceService.getProducts().subscribe((prods) => {
      const products = this.wooCommerceService.adaptProductsInterface(prods);
      this.carouselList = [
        {
          bannerImg: products[0].productImageUrl,
          title: products[0].productName,
          description: "",
        },
        {
          bannerImg: products[1].productImageUrl,
          title: products[1].productName,
          description: "",
        },
        {
          bannerImg: products[2].productImageUrl,
          title: products[2].productName,
          description: "",
        },
      ];
    });
  }
}
