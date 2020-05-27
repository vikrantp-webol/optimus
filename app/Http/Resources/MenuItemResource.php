<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'parent_id' => $this->parent_id,
            'linkable_type' => $this->linkable
                ? $this->linkable::getLinkableTypeIdentifier()
                : null,
            'linkable_id' => optional($this->linkable)->getKey(),
            'linkable_label' => optional($this->linkable)->getLabel(),
            'url' => $this->url,
            'url_parameters' => $this->url_parameters,
            'opens_in_new_tab' => $this->opens_in_new_tab,
            'order' => $this->order,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
