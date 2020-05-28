<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MenuItemResource;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Registries\LinkableTypes;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

class MenuItemsController extends Controller
{
    protected $morphKeys = [
        'type' => 'linkable_type',
        'id' => 'linkable_id',
    ];

    /**
     * Display a list of menu items.
     *
     * @return ResourceCollection
     */
    public function index($menuId)
    {
        $menu = Menu::findOrFail($menuId);

        $items = $menu->items()
            ->with('linkable')
            ->get();

        return MenuItemResource::collection($items);
    }

    /**
     * Create a new menu item.
     *
     * @param Request $request
     * @param int $menuId
     * @return MenuItemResource
     * @throws ValidationException
     */
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

    /**
     * Display the specified menu item.
     *
     * @param int $id
     * @return MenuItemResource
     */
    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);

        return new MenuItemResource($menuItem);
    }

    /**
     * Update the specified menu item.
     *
     * @param Request $request
     * @param int $id
     * @return MenuItemResource
     * @throws ValidationException
     */
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

    /**
     * Update the order of the specified menu item.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
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

    /**
     * Delete the specified menu item.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
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
    protected function validateMenuItem(Request $request)
    {
        $rules = [
            'label' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',
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

    /**
     * Retrieves the linkable items for the requested model.
     *
     * @param Request $request
     * @throws ValidationException
     */
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
