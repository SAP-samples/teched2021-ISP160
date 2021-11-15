import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
// import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { GigyaService } from "../../../../shared/services/gigya/gigya.service";
import { WooCommerceService } from "../../../../shared/services/wooCommerce/woo-commerce.service";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  loading = false;
  categories = [];

  productCategory: "All";

  page = 1;
  constructor(
    // public authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private gigyaService: GigyaService,
    private wooCommerceService: WooCommerceService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    const x = this.wooCommerceService
      .getProducts()
      .subscribe((prods: Product[]) => {
        const products = this.wooCommerceService.adaptProductsInterface(prods);
        this.productList = products;
        this.categories = this.wooCommerceService.getCategories(products);
        this.loading = false;
      });
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
    // WEB SDK
    (window as any).CDP.report("addToCart", {});
  }
}
