<?php

namespace App\Templates;

use Optimus\Pages\Template;
use Illuminate\Http\Request;
use Optimus\Pages\Models\Page;

class HomeTemplate extends Template
{
    public function name(): string
    {
        return 'home';
    }

    public function validate(Request $request)
    {
        $request->validate([
            //
        ]);
    }

    public function save(Page $page, Request $request)
    {
        $page->addContents([
            //
        ]);
    }
}
