<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Controllers\Back\Controller;
use App\Http\Resources\PageTemplateResource;
use App\PageTemplates\TemplateRegistry;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PageTemplatesController extends Controller
{
    /**
     * Display a list of page templates.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        $templates = TemplateRegistry::all();

        return PageTemplateResource::collection($templates);
    }

    /**
     * Display the specified page template.
     *
     * @param string $id
     * @return PageTemplateResource
     */
    public function show($id)
    {
        $template = TemplateRegistry::get($id);

        return new PageTemplateResource($template);
    }
}
