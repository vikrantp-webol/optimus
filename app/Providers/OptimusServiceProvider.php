<?php

namespace App\Providers;

use App\Exceptions\InvalidTemplateException;
use App\Models\Media;
use App\Models\Meta;
use App\Models\Page;
use App\PageTemplates\DefaultTemplate;
use App\Registries\LinkableTypes;
use App\Registries\PageTemplates;
use Illuminate\Support\ServiceProvider;
use Intervention\Image\Image;
use Optix\Media\Facades\Conversion;

class OptimusServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     *
     * @throws InvalidTemplateException
     */
    public function boot()
    {
        PageTemplates::set([
            DefaultTemplate::class,
        ]);

        LinkableTypes::register([
            Page::class,
        ]);

        // Media thumbnail...
        Conversion::register(
            Media::THUMBNAIL_CONVERSION,
            function (Image $image) {
                return $image->fit(400, 300);
            }
        );

        // OG image...
        Conversion::register(
            Meta::OG_IMAGE_MEDIA_CONVERSION,
            function (Image $image) {
                return $image->fit(1200, 630);
            }
        );
    }
}
