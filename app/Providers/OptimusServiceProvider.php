<?php

namespace App\Providers;

use App\PageTemplates\TemplateRegistry;
use Illuminate\Support\ServiceProvider;

class OptimusServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        TemplateRegistry::register([
            //
        ]);
    }
}
