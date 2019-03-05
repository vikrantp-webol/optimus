const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.setPublicPath('public/front')
   .js('resources/js/front/app.js', 'js')
   .sass('resources/sass/front/app.scss', 'css')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./resources/sass/front/tailwind.js') ],
   })
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/front' }
       }
   });
