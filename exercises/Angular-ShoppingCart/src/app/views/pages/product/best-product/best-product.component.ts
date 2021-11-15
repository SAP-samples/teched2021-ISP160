import { TranslateService } from "src/app/shared/services/translate.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "src/app/shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { map } from "rxjs/operators";
import { WooCommerceService } from "../../../../shared/services/wooCommerce/woo-commerce.service";

@Component({
  selector: "app-best-product",
  templateUrl: "./best-product.component.html",
  styleUrls: ["./best-product.component.scss"],
})
export class BestProductComponent implements OnInit {
  bestProducts: Product[] = [];
  options: any;
  loading = false;

  constructor(
    private productService: ProductService,
    private toasterService: ToastrService,
    public translate: TranslateService,
    private wooCommerceService: WooCommerceService
  ) {}

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        0: { items: 1, margin: 5 },
        430: { items: 2, margin: 5 },
        550: { items: 3, margin: 5 },
        670: { items: 4, margin: 5 },
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true,
    };
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    const x = this.wooCommerceService
      .getProducts()
      .subscribe((prods: Product[]) => {
        const products = this.wooCommerceService.adaptProductsInterface(prods);
        this.loading = false;
        this.bestProducts = [];
        this.bestProducts = products.slice(0, 5);
      });
  }
}
