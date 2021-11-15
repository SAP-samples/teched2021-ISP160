import { Injectable } from "@angular/core";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WooCommerceService {
  products;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get("https://localhost:3000/products");
  }

  adaptProductsInterface(products) {
    if (products.length === 0) {
      return;
    }
    this.products = products.map((product) => {
      return {
        $key: product.id,
        favourite: false,
        productAdded: 0,
        productCategory: product.categories ? product.categories[0]?.name : "",
        productDescription: product.description.replace("<p>", ""),
        productId: product.id,
        productImageUrl: product.images ? product.images[0].src : "",
        productName: product.name,
        productPrice: product.price,
        productQuatity: product.stock_quantity || 0,
        productSeller: "",
        ratings: product.rating_count,
      };
    });
    return this.products;
  }

  getProductById(id) {
    return this.products?.find(
      (product) => product.productId.toString() === id
    );
  }

  getCategories(products) {
    if (!products) {
      return;
    }
    return ["All", ...new Set(products.map((p) => p.productCategory))];
  }

  createWooCommerceNewCustomer(event) {
    console.log("createWooCommerceNewCustomer");
    const data = {
      email: event.profile.email,
      first_name: event.profile.firstName,
      last_name: event.profile.lastName,
      username: "",
      billing: {
        first_name: event.profile.firstName,
        last_name: event.profile.lastName,
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        email: event.profile.email,
        phone: "",
      },
      shipping: {
        first_name: event.profile.firstName,
        last_name: event.profile.lastName,
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
      },
    };

    this.http.post("https://localhost:3000/customers", data);
    // .subscribe((response) => {
    //   console.log('customers', response);
    //   // this.user.id = response.data.id;
    //   // this.user.meta_data = response.data.meta_data.push({GigyaUID: this.gigya.event.UID});
    // })
  }

  wooCommerceNewOrder(purchaseInfo) {
    console.log("wooCommerceNewOrder", purchaseInfo);
    this.http.post("https://localhost:3000/orders", purchaseInfo);
    // .subscribe((response) => {
    //   console.log('order made', response);
    // });
  }
}
