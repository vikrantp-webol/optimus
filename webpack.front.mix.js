const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resources/js/front/app.js', 'public/js/front')
   .sass('resources/sass/front/app.scss', 'public/css/front')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./resources/sass/front/tailwind.js') ],
   })
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/front' }
       }
   });
