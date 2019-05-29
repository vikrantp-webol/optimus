const glob = require('glob-all');
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const PurgecssPlugin = require('purgecss-webpack-plugin');

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

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

if (mix.inProduction()) {
    mix.version()
       .webpackConfig({
           plugins: [
               new PurgecssPlugin({
                   paths: glob.sync([
                       path.join(__dirname, "resources/views/front/**/*.blade.php"),
                       path.join(__dirname, "resources/js/front/**/*.vue")
                   ]),
                   extractors: [{
                       extractor: TailwindExtractor,
                       extensions: ['html', 'js', 'php', 'vue']
                   }],
                   whitelistPatterns: [/swiper/]
               })
           ]
       });
}
