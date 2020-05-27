<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MenuItemResource;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Registries\LinkableTypes;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

class MenuItemsController extends Controller
{
    protected $morphKeys = [
        'type' => 'linkable_type',
        'id' => 'linkable_id',
    ];

    public function index($menuId)
    {
        $menu = Menu::findOrFail($menuId);

        $items = $menu->items()
            ->with('linkable')
            ->get();

        return MenuItemResource::collection($items);
    }

    public function store(Request $request, $menuId)
    {
        $menu = Menu::findOrFail($menuId);

        $this->validateMenuItem($request);
        $linkable = $this->getLinkableItem($request);

        $menuItem = new MenuItem();

        $menuItem->label = $request->input('label');
        $menuItem->parent_id = $request->input('parent_id');

        if (! is_null($linkable)) {
            $menuItem->linkable()->associate($linkable);
            $menuItem->url = $linkable->getUrl();
        } else {
            $menuItem->url = $request->input('url');
        }

        $menuItem->url_parameters = $request->input('url_parameters');
        $menuItem->opens_in_new_tab = $request->input('opens_in_new_tab');

        $menu->items()->save($menuItem);

        return new MenuItemResource($menuItem);
    }

    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);

        return new MenuItemResource($menuItem);
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $this->validateMenuItem($request);
        $linkable = $this->getLinkableItem($request);

        $menuItem->label = $request->input('label');
        $menuItem->parent_id = $request->input('parent_id');

        if (! is_null($linkable)) {
            $menuItem->linkable()->associate($linkable);
            $menuItem->url = $linkable->getUrl();
        } else {
            $menuItem->url = $request->input('url');
        }

        $menuItem->url_parameters = $request->input('url_parameters');
        $menuItem->opens_in_new_tab = $request->input('opens_in_new_tab');

        $menuItem->save();

        return new MenuItemResource($menuItem);
    }

    public function move(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $request->validate([
            'direction' => 'required|in:up,down',
        ]);

        $request->input('direction') === 'down'
            ? $menuItem->moveOrderDown()
            : $menuItem->moveOrderUp();

        return response()->noContent();
    }

    public function destroy($id)
    {
        MenuItem::findOrFail($id)->delete();

        return response()->noContent();
    }

    protected function validateMenuItem(Request $request)
    {
        $rules = [
            'label' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id', // Todo: Verify depth...
        ];

        if ($request->anyFilled($this->morphKeys)) {
            $rules = array_merge($rules, [
                $this->morphKeys['type'] => 'required',
                $this->morphKeys['id'] => 'required',
            ]);
        } else {
            $rules['url'] = 'required|string|max:255';
        }

        $rules = array_merge($rules, [
            'url_parameters' => 'nullable|string|max:255',
            'opens_in_new_tab' => 'present|boolean',
        ]);

        $request->validate($rules);
    }

    protected function getLinkableItem(Request $request)
    {
        if (! $request->anyFilled($this->morphKeys)) {
            return;
        }

        try {
            $model = LinkableTypes::get(
                $request->input($this->morphKeys['type'])
            );
        } catch (Exception $e) {
            throw ValidationException::withMessages([
                'linkable' => __('validation.exists', [
                    'attribute' => 'linkable type',
                ]),
            ]);
        }

        $linkable = $model::buildLinkableQuery()->find(
            $request->input($this->morphKeys['id'])
        );

        if (is_null($linkable)) {
            throw ValidationException::withMessages([
                __('validation.exists', [
                    'attribute' => 'linkable id',
                ]),
            ]);
        }

        return $linkable;
    }
}
