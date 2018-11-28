const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/back/app.js', 'public/js/back')
   .sass('resources/sass/back/app.scss', 'public/css/back')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./resources/sass/back/tailwind.js') ],
   })
   .webpackConfig({
       resolve: {
           alias: { '@back': __dirname + '/resources/js/back' }
       }
   });
