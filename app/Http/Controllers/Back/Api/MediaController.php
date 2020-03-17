<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Optix\Media\Jobs\PerformConversions;
use Optix\Media\MediaUploader;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::applyFilters($request->all())->get();

        return MediaResource::collection($media);
    }

    public function store(StoreMediaRequest $request)
    {
        $media = MediaUploader::fromFile($request->file('file'))
            ->withAttributes($request->only([
                'folder_id',
                'caption',
                'alt_text',
            ]))
            ->upload();

        if (starts_with($media->mime_type, 'image')) {
            PerformConversions::dispatch($media, [
                'media-thumbnail',
            ]);
        }

        return (new MediaResource($media))->response()->setStatusCode(201);
    }

    public function show($id)
    {
        $media = Media::findOrFail($id);

        return new MediaResource($media);
    }

    public function update(UpdateMediaRequest $request, $id)
    {
        $media = Media::findOrFail($id);

        $media->update($request->only([
            'folder_id',
            'caption',
            'alt_text',
            'name',
        ]));

        return new MediaResource($media);
    }

    public function destroy($id)
    {
        Media::findOrFail($id)->delete();

        return response(null, 204);
    }
}
