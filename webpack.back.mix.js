const mix = require('laravel-mix');

mix.setPublicPath('public/back')
   .js('resources/js/back/app.js', 'js')
   .sass('resources/sass/back/app.scss', 'css')
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/back' }
       }
   });
