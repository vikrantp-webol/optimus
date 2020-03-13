<?php

namespace App\PageTemplates;

use OptimusCMS\Media\Http\Resources\MediaResource;
use OptimusCMS\Pages\Contracts\PageTemplate;
use OptimusCMS\Pages\Models\Page;

class DefaultTemplate implements PageTemplate
{
    public static function getId(): string
    {
        return 'default';
    }

    public static function getName(): string
    {
        return 'Default';
    }

    public static function getMeta(): array
    {
        return [];
    }

    public static function validateData(array $data)
    {
        validator($data, [
            'content' => 'required|string',
            'image_id' => 'required|exists:media,id',
        ])->validate();
    }

    public static function saveData(Page $page, array $data)
    {
        $page->addContents([
            'content' => $data['content'],
        ]);

        $page->attachMedia($data['image_id'], 'image', [
            '1024x768',
        ]);
    }

    public static function resetData(Page $page)
    {
        $page->clearContents();
        $page->detachMedia();
    }

    public static function getData(Page $page): array
    {
        return [
            'content' => $page->getContent('content'),
            'image' => new MediaResource($page->getFirstMedia('image')),
        ];
    }

    public static function render(Page $page)
    {
        return view('front.default', compact('page'));
    }
}
