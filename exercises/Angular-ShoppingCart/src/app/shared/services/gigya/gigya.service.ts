import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ZoneAwareProxyService } from "../zone-aware/zone-aware-proxy.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { WooCommerceService } from "../wooCommerce/woo-commerce.service";
import { UserService } from "../user.service";

@Injectable({
  providedIn: "root",
})
export class GigyaService {
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _account$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  gigya: any;

  categories: any;

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$;
  }

  get account$(): Observable<any> {
    return this._account$;
  }

  constructor(
    private zoneAwareProxySrv: ZoneAwareProxyService,
    private router: Router,
    private http: HttpClient,
    private wooCommerceService: WooCommerceService,
    private userService: UserService
  ) {
    this.gigya = (window as any).gigya;
  }

  wrapNamespaceWithZoneAwareProxy<T>(namespace: string): T {
    return new Proxy(this.gigya[namespace], {
      get: (target, prop: string) => {
        return (param) => {
          return this.zoneAwareProxySrv.run(
            target[prop],
            `gigya.${namespace}.${prop}`,
            param
          );
        };
      },
    });
  }

  onLogin(event): void {
    this._isLoggedIn$.next(true);
    this._account$.next(event);
    this.userService.createLocalUser(event);
  }

  onLogout(): void {
    this._isLoggedIn$.next(false);
    this._account$.next(undefined);
    this.router.navigate(["/"]);
  }
}
