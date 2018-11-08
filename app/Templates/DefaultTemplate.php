<?php

namespace App\Templates;

use Illuminate\Http\Request;
use Optimus\Pages\Models\Page;
use Optimus\Pages\TemplateContract;

class DefaultTemplate implements TemplateContract
{
    public function validate(Request $request)
    {
        $request->validate([
            'content' => 'required'
        ]);
    }

    public function save(Page $page, Request $request)
    {
        $page->addContents([
            'content' => $request->input('content'),
        ]);
    }
}
