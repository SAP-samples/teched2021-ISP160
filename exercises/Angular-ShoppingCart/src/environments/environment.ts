// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: require("../../package.json").version,
  firebaseConfig: {
    apiKey: "AIzaSyA6yR7_Dlr1GOcxxAVLaokQMuq5--FMyLM",
    authDomain: "angular-shoping-cart-d1042.firebaseapp.com",
    projectId: "angular-shoping-cart-d1042",
    storageBucket: "angular-shoping-cart-d1042.appspot.com",
    messagingSenderId: "751757086055",
    appId: "1:751757086055:web:e3711e233ffd48436d33c2",
    measurementId: "G-G5CC7S8N1N",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
