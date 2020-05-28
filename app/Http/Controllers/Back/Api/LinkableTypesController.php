<?php

namespace App\Http\Controllers\Back\Api;

use App\Registries\LinkableTypes;
use Illuminate\Routing\Controller;

class LinkableTypesController extends Controller
{
    public function index()
    {
        $types = LinkableTypes::all();

        $transformedTypes = [];

        foreach ($types as $type) {
            $transformedTypes[] = $this->transform($type);
        }

        return response()->json([
            'data' => $transformedTypes,
        ]);
    }

    public function show($identifier)
    {
        $type = LinkableTypes::get($identifier);

        return response()->json([
            'data' => $this->transform($type),
        ]);
    }

    protected function transform($type)
    {
        return [
            'identifier' => $type::getLinkableTypeIdentifier(),
            'name' => $type::getLinkableTypeName(),
        ];
    }
}
