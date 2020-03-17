<?php

namespace OptimusCMS\Meta\Http\Resources;

use App\Http\Resources\MediaResource;
use App\Models\Meta;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MetaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'og_title' => $this->og_title,
            'og_description' => $this->og_description,
            'og_image' => new MediaResource(
                $this->getFirstMedia(Meta::OG_IMAGE_MEDIA_GROUP)
            ),
            'additional_tags' => $this->additional_tags,
        ];
    }
}
