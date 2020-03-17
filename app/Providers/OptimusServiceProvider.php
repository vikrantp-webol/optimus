<?php

namespace App\Providers;

use App\Exceptions\InvalidTemplateException;
use App\PageTemplates;
use App\PageTemplates\DefaultTemplate;
use Illuminate\Support\ServiceProvider;

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
    }
}
