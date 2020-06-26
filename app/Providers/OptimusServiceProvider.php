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

/*--OPTIMUS-CLI:imports--*/

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

            /*--OPTIMUS-CLI:page-templates--*/
        ]);

        LinkableTypes::register([
            Page::class,

            /*--OPTIMUS-CLI:linkable-types--*/
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

        /*--OPTIMUS-CLI:media-conversions--*/
    }
}
