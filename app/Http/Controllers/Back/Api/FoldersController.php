<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Http\Resources\FolderResource;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class FoldersController extends Controller
{
    public function index(Request $request)
    {
        $folders = MediaFolder::applyFilters($request->all())->get();

        return FolderResource::collection($folders);
    }

    public function store(StoreFolderRequest $request)
    {
        $folder = MediaFolder::create($request->all());

        return new FolderResource($folder);
    }

    public function show($id)
    {
        $folder = MediaFolder::findOrFail($id);

        return new FolderResource($folder);
    }

    public function update(UpdateFolderRequest $request, $id)
    {
        $folder = MediaFolder::findOrFail($id);

        $folder->update($request->all());

        return new FolderResource($folder);
    }

    public function destroy($id)
    {
        $folder = MediaFolder::findOrFail($id);

        $folder->media->each->delete();

        $folder->delete();

        return response(null, 204);
    }
}
