const mix = require('laravel-mix');

mix.js('resources/js/admin/app.js', 'public/js/admin')
   .sass('resources/sass/admin/app.scss', 'public/css/admin')
   .webpackConfig({
       resolve: {
           alias: { '@js': __dirname + '/resources/js/admin' }
       }
   });
