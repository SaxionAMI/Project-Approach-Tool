# Project Approach Tool

## Config file 
The config file can be found in the main directory as config.ts, here you can edit the API urls and global variables.
If you would like to use DEV api comment out the production api and uncomment the dev and if needed alter the url.

Before running or building you should run npm install!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build & running on the provided Saxion server

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Copy the dist/pat folder content to the server /var/www/pat folder and NGINX will serve it on the external ip : web port with current configuration (Matyas used the WINscp tool to copy paste the files).

If you have to serve it on different server, then use NGINX or a similar tool to serve the HTML files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

