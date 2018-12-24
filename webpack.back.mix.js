const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resources/js/back/app.js', 'public/js/back')
   .sass('resources/sass/back/app.scss', 'public/css/back')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./resources/sass/back/tailwind.js') ],
   })
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/back' }
       }
   });
