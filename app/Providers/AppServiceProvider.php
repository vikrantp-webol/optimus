<?php

namespace App\Providers;

use App\Templates\HomeTemplate;
use App\Templates\DefaultTemplate;
use Optimus\Pages\Facades\Template;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Templates
        Template::registerMany([
            new HomeTemplate,
            new DefaultTemplate
        ]);

        // Pagination
        Paginator::defaultView('front.partials.pagination');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
