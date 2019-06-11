const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');

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
               '@js': __dirname + '/resources/js/front',
               '@sass': __dirname + '/resources/sass/front',
           }
        }
    });

if (mix.inProduction()) {
    mix.version()
       .purgeCss({
           extensions: ['html', 'js', 'php', 'vue'],
           folders: [
              'resources/views/front',
              'resources/js/front'
           ],
           whitelistPatterns: [/swiper/]
       });
}
