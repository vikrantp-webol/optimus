<?php

namespace App\Templates;

use Optimus\Pages\Page;
use Illuminate\Support\Collection;
use Optimus\Pages\Contracts\Template;

class HomeTemplate implements Template
{
    public function validationRules(Page $page = null)
    {
        return [
            'content' => 'required'
        ];
    }

    public function saveContents(Page $page, Collection $contents)
    {
        $page->addContents([
            'content' => $contents->get('content')
        ]);
    }
}
