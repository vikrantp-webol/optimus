const mix = require('laravel-mix');

mix.js('resources/js/front/app.js', 'public/js/front')
   .sass('resources/sass/front/app.scss', 'public/css/front');

mix.js('resources/js/back/app.js', 'public/js/back')
   .sass('resources/sass/back/app.scss', 'public/css/back');
