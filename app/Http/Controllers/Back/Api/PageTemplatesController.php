<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Controllers\Back\Controller;
use App\Http\Resources\PageTemplateResource;
use App\PageTemplates;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PageTemplatesController extends Controller
{
    /**
     * Display a list of templates.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        $templates = PageTemplates::all();

        return PageTemplateResource::collection($templates);
    }

    /**
     * Display the specified template.
     *
     * @param string $id
     * @return PageTemplateResource
     */
    public function show($id)
    {
        $template = PageTemplates::get($id);

        return new PageTemplateResource($template);
    }
}
