<?php

namespace App\Providers;

use App\Templates\DefaultTemplate;
use OptimusCMS\Pages\Facades\Template;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Template::registerMany([
            DefaultTemplate::class,
        ]);
    }
}
