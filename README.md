# ScalioChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.


## About challenge execution

### Sorting

Sorting needed to be executed in frontend code.

The reason is because the `/search/users` endpoint doesn't support sorting by `avatar_urL`, `login` or `type`. By [GitHub Docs](https://docs.github.com/pt/rest/search#search-users), the this endpoint only allow sort by **number of followers**, **number of repositories** or **when the person joined GitHub**.
   

## Execution in development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.