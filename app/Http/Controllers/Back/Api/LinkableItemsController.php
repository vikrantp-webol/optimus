<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\LinkableItemResource;
use App\Registries\LinkableTypes;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LinkableItemsController extends Controller
{
    public function index(Request $request, $identifier)
    {
        try {
            $type = LinkableTypes::get($identifier);
        } catch (Exception $e) {
            throw new NotFoundHttpException();
        }

        if ($input = $request->input('q')) {
            $query = $type::buildLinkableSearchQuery($input);
        } else {
            $query = $type::buildLinkableQuery();
        }

        $items = $query->paginate();

        return LinkableItemResource::collection($items);
    }
}
