// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDqh6Y_wtBSqZgnv7UL9oHMwXqV63dU_v4',
    authDomain: 'wko-app.firebaseapp.com',
    databaseURL: 'https://wko-app.firebaseio.com',
    projectId: 'wko-app',
    storageBucket: 'wko-app.appspot.com',
    messagingSenderId: '664217409866'
  }
};
