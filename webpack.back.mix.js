const mix = require('laravel-mix');

mix.js('resources/js/back/app.js', 'public/js/back')
   .sass('resources/sass/back/app.scss', 'public/css/back')
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/back' }
       }
   });
