<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class MenusController
{
    /**
     * Display a list of menus.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        $menus = Menu::orderByDesc('name')->get();

        return MenuResource::collection($menus);
    }

    /**
     * Create a new menu.
     *
     * @param Request $request
     * @return MenuResource
     */
    public function store(Request $request)
    {
        $this->validateMenu($request);

        $menu = new Menu();

        $menu->name = $request->input('name');
        $menu->identifier = $request->input('identifier');

        $menu->save();

        return new MenuResource($menu);
    }

    /**
     * Display the specified menu.
     *
     * @param int $id
     * @return MenuResource
     */
    public function show($id)
    {
        $menu = Menu::findOrFail($id);

        return new MenuResource($menu);
    }

    /**
     * Update the specified menu.
     *
     * @param Request $request
     * @param int $id
     * @return MenuResource
     */
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $this->validateMenu($request);

        $menu->name = $request->input('name');
        $menu->identifier = $request->input('identifier');

        $menu->save();

        return new MenuResource($menu);
    }

    // public function duplicate();

    /**
     * Delete the specified menu.
     *
     * @param int $id
     * @return Response
     */
    public function delete($id)
    {
        MenuItem::findOrFail($id)->delete();

        return response()->noContent();
    }

    /**
     * Validate the request.
     *
     * @param Request $request
     * @return void
     */
    protected function validateMenu(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'identifier' => 'required|string|max:255',
        ]);
    }
}
