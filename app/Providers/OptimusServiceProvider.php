<?php

namespace App\Providers;

use App\PageTemplates\DefaultTemplate;
use Illuminate\Support\ServiceProvider;
use OptimusCMS\Pages\PageTemplates;

class OptimusServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        PageTemplates::register([
            DefaultTemplate::class,
        ]);
    }
}
