import { TestBed } from "@angular/core/testing";

import { GigyaService } from "./gigya.service";

describe("GigyaService", () => {
  let service: GigyaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigyaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
