<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LinkableItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->resource->getKey(),
            'label' => $this->resource->getLabel(),
        ];
    }
}
