<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MenuTypeResource;
use App\Models\MenuType;
use Illuminate\Routing\Controller;

class MenuTypesController extends Controller
{
    public function index()
    {
        $types = MenuType::orderBy('name')->get();

        return MenuTypeResource::collection($types);
    }

    public function show($id)
    {
        $type = MenuType::findOrFail($id);

        return new MenuTypeResource($type);
    }
}
