// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const angularFirebaseConfig = {
  apiKey: "<<<an API key used to connect to the firebase API>>>",
  authDomain: "<<<the firebase API to connect to>>>",
  databaseURL: "<<<the firebase database to connect to>>>",
  projectId: "<<<the firebase project ID>>>",
  storageBucket: "<<<the address of the firebase storage bucket>>>",
  messagingSenderId: "<<<an ID for sending messages>>>",
  appId: "<<<an application ID for the firebase app>>>",
  measurementId: "<<<a measurement ID for the firebase app>>>"
};

export const actionCodeSettings = {
  url: "http://localhost:4200/load",                     //localhost
  // url: "http://api.thisisaplaceholder.org/load",                 //server url
  handleCodeInApp: true
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
