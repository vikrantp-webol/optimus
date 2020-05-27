<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenusController
{
    public function index()
    {
        // Todo: Order by type.order?
        $menus = Menu::with('type')->get();

        return MenuResource::collection($menus);
    }

    public function store(Request $request)
    {
        $this->validateMenu($request);

        $menu = new Menu();

        $menu->name = $request->input('name');
        $menu->type_id = $request->input('type_id');

        $menu->save();

        return new MenuResource($menu);
    }

    public function show($id)
    {
        $menu = Menu::with('type')->findOrFail($id);

        return new MenuResource($menu);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $this->validateMenu($request);

        $menu->name = $request->input('name');
        $menu->type_id = $request->input('type_id');

        return new MenuResource($menu);
    }

    // public function publish();

    // public function duplicate();

    public function delete($id)
    {
        MenuItem::findOrFail($id)->delete();

        return response()->noContent();
    }

    protected function validateMenu(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type_id' => 'required|exists:menu_types,id',
        ]);
    }
}
