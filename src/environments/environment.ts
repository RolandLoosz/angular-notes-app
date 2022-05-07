// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAwjP-GBSF5Hp_bM6g3ATXFjTO1MmFEFbI",
    authDomain: "webkert-beadando-3311b.firebaseapp.com",
    projectId: "webkert-beadando-3311b",
    storageBucket: "webkert-beadando-3311b.appspot.com",
    messagingSenderId: "668605344870",
    appId: "1:668605344870:web:b2dceec2ca5d446893d1a7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
