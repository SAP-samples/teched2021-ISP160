import { Product } from "../../../../shared/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { combineLatest, Subscription } from "rxjs";
import { WooCommerceService } from "../../../../shared/services/wooCommerce/woo-commerce.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  product: Product;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private wooCommerceService: WooCommerceService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub.add(
      combineLatest([
        this.route.params,
        this.wooCommerceService.getProducts(),
      ]).subscribe(([params, prods]) => {
        const id = params.id; // (+) converts string 'id' to a number
        const products = this.wooCommerceService.adaptProductsInterface(prods);
        this.getProductDetail(id);
      })
    );
  }

  getProductDetail(id: string) {
    this.loading = false;
    this.product = this.wooCommerceService.getProductById(id);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
    // WEB SDK
    (window as any).CDP.report("addToCart", {});
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
