# Rigel UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## Run Application locally

Run `npm install` to install all the dependency packages first.


Before running application make sure the `localize : false` flag inside `angular.json -> under build` is marked false.


If you want to run application with different locale set `localize : ['<Locale_code>']` under `angular.json -> under build`.


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Make Build

Run `npm install` to install all the dependency packages first.


Run `npm run build:i18n` to build the project with localization files. The build files will be stored in the `dist/` directory.


Run `npm run build` to build the project without localization files and english as default language. The build files will be stored in the `dist/` directory.
