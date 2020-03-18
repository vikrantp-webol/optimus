<?php

namespace App\Providers;

use App\Exceptions\InvalidTemplateException;
use App\Models\Media;
use App\PageTemplates;
use App\PageTemplates\DefaultTemplate;
use Illuminate\Support\ServiceProvider;
use Intervention\Image\Image;
use Optix\Media\Facades\Conversion;

class MediaServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Media thumbnail...
        Conversion::register(
            Media::THUMBNAIL_CONVERSION,
            function (Image $image) {
                return $image->fit(400, 300);
            }
        );
    }
}
