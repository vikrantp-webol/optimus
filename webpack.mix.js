const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/**
 * Front
 */
mix.setPublicPath('public/front')
   .js('resources/js/front/app.js', 'js')
   .sass('resources/sass/front/app.scss', 'css')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./resources/sass/front/tailwind.js') ]
   })
   .webpackConfig({
       resolve: {
           alias: {
               'front/js': __dirname + '/resources/js/front',
               'front/sass': __dirname + '/resources/sass/front',
           }
        }
    });

/**
 * Back
 */
mix.setPublicPath('public/back')
   .js('resources/js/back/app.js', 'js')
   .sass('resources/sass/back/app.scss', 'css')
   .webpackConfig({
       resolve: {
           alias: {
               'back/js': __dirname + '/resources/js/back',
               'back/sass': __dirname + '/resources/sass/back'
           }
       }
   });

if (mix.inProduction()) {
    mix.version();
}
