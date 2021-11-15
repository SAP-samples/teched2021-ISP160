import { TranslateService } from "../../../../shared/services/translate.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ProductService } from "../../../../shared/services/product.service";

import { ThemeService } from "src/app/shared/services/theme.service";
import { GigyaService } from "../../../../shared/services/gigya/gigya.service";

declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  colorPallet1 = [
    {
      title: "Purple Theme",
      color: "color-purple",
      id: "purple-theme",
    },
    {
      title: "Blue Theme",
      color: "color-blue",
      id: "blue-theme",
    },
  ];
  colorPallet2 = [
    {
      title: "Red Theme",
      color: "color-red",
      id: "red-theme",
    },
    {
      title: "Violet Theme",
      color: "color-violet",
      id: "violet-theme",
    },
  ];
  languageList = [
    { language: "English", langCode: "en" },
    { language: "French", langCode: "fr" },
    { language: "Persian", langCode: "fa" },
    { language: "Japanese", langCode: "ja" },
    { language: "Hindi", langCode: "hin" },
  ];
  accounts;
  gigya;

  constructor(
    // public authService: AuthService,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService,
    public gigyaService: GigyaService
  ) {
    this.gigya = (window as any).gigya;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.accounts = this.gigyaService.wrapNamespaceWithZoneAwareProxy<any>(
      "accounts"
    );

    this.accounts.addEventHandlers({
      onLogin: (ev) => this.gigyaService.onLogin(ev),
      onLogout: () => this.gigyaService.onLogout(),
    });
  }

  setLang(lang: string) {
    this.translate.use(lang).then(() => {});
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }
}
