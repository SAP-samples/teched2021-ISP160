import { TestBed } from "@angular/core/testing";

import { WooCommerceService } from "./woo-commerce.service";

describe("WooCommerceService", () => {
  let service: WooCommerceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WooCommerceService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
