<?php

namespace App\Templates;

use Optimus\Pages\Page;
use Illuminate\Support\Collection;
use Optimus\Pages\Contracts\Template;

class DefaultTemplate implements Template
{
    public function validationRules(Page $page = null)
    {
        return [
            'content' => 'required',
            'images' => 'array',
            'images.*' => 'exists:media,id'
        ];
    }

    public function saveContents(Page $page, Collection $contents)
    {
        $page->addContents([
            'content' => $contents->get('content'),
        ]);

        $page->attachMedia($contents->get('images', []), 'images', ['1000w']);
    }
}
