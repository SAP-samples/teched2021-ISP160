import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import * as moment from "moment";
import { User } from "../models/user";
import { WooCommerceService } from "./wooCommerce/woo-commerce.service";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  users: AngularFireList<User>;
  user;

  location = {
    lat: null,
    lon: null,
  };

  constructor(
    private db: AngularFireDatabase,
    private wooCommerceService: WooCommerceService
  ) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.list("clients");
    return this.users;
  }

  getUserById(id: string) {}

  createUser(data: any) {
    const updatedData = {
      ...data,
      location: this.location,
      createdOn: moment(new Date()).format("X"),
      isAdmin: false,
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  updateUser(user: User) {
    this.users.update(user.$key, user);
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }

  createLocalUser(event) {
    this.user = {
      firstName: event.profile.firstName,
      lastName: event.profile.lastName,
      email: event.profile.email,
      zip: event.profile.zip,
    };

    if (event.newUser) {
      console.log("new user");
      this.wooCommerceService.createWooCommerceNewCustomer(event.profile);
    }
  }
}
