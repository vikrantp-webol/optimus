const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

let frontOptions = [
    tailwindcss('./resources/sass/front/tailwind.config.js'),
];

if (mix.inProduction()) {
    frontOptions.push(
        purgecss({
            content: [
                'resources/**/front/**/*.html',
                'resources/**/front/**/*.js',
                'resources/**/front/**/*.php',
                'resources/**/front/**/*.vue',
            ],
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                        }
                    },
                    extensions: ['js', 'php', 'vue'],
                },
            ],
            whitelistPatterns: [/swiper/],
        })
    );

    mix.version();
}

mix.js('resources/js/front/app.js', 'public/front/js')
    .js('resources/js/back/app.js', 'public/back/js')
    .sass(
        'resources/sass/front/app.scss',
        'public/front/css',
        {},
        frontOptions
    )
    .sass('resources/sass/back/app.scss', 'public/back/css')
    .options({ processCssUrls: false });
