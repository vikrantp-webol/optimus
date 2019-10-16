<?php

namespace App\Templates;

use OptimusCMS\Pages\Models\Page;
use OptimusCMS\Pages\Contracts\Template;
use OptimusCMS\Media\Http\Resources\MediaResource;

class DefaultTemplate implements Template
{
    /**
     * Get the template's name.
     *
     * @return string
     */
    public static function name(): string
    {
        return 'default';
    }

    /**
     * Get the template's label.
     *
     * @return string
     */
    public static function label(): string
    {
        return 'Default';
    }

    /**
     * Validate the template data.
     *
     * @param array $data
     * @return void
     *
     * @throws ValidationException
     */
    public function validate(array $data)
    {
        validator($data, [
            'content' => 'required|string',
            'image_id' => 'exists:media,id',
        ])->validate();
    }

    /**
     * Save the template data to the page.
     *
     * @param Page $page
     * @param array $data
     * @return void
     */
    public function save(Page $page, array $data)
    {
        $page->addContents([
            'content' => $data['content'],
        ]);

        $page->attachMedia($data['image_id'], 'image');
    }

    /**
     * Reset the template to its original state.
     *
     * @param Page $page
     * @return void
     */
    public function reset(Page $page)
    {
        $page->clearContents();
        $page->detachMedia();
    }

    /**
     * Render the template.
     *
     * @param Page $page
     * @return Response
     */
    public function render(Page $page)
    {
        //
    }

    /**
     * Transform the template data into an array.
     *
     * @param Page $page
     * @return array
     */
    public function toArray(Page $page): array
    {
        return [
            'content' => $page->getContent('content'),
            'image' => new MediaResource($page->getFirstMedia('image')),
        ];
    }
}
