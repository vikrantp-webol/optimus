<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Optix\Media\Jobs\PerformConversions;
use Optix\Media\MediaUploader;

class MediaController extends Controller
{
    /**
     * Display a list of media items.
     *
     * @param Request $request
     * @return ResourceCollection
     */
    public function index(Request $request)
    {
        /** @var Collection $media */
        $media = Media::query()
            ->applyFilters($request->all())
            ->get();

        return MediaResource::collection($media);
    }

    /**
     * Create a new media item.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:'.config('media.max_file_size'),
            'folder_id' => 'nullable|exists:media_folders,id',
        ]);

        /** @var Media $media */
        $media = MediaUploader::fromFile($request->file('file'))
            ->withAttributes([
                'folder_id' => $request->input('folder_id'),
            ])
            ->upload();

        if ($media->isOfType('image')) {
            PerformConversions::dispatchNow($media, [
                Media::THUMBNAIL_CONVERSION,
            ]);
        }

        $resource = new MediaResource($media);

        return $resource->response()->setStatusCode(201);
    }

    /**
     * Display the specified media item.
     *
     * @param int $id
     * @return MediaResource
     */
    public function show($id)
    {
        $media = Media::findOrFail($id);

        return new MediaResource($media);
    }

    /**
     * Update the specified media item.
     *
     * @param Request $request
     * @param int $id
     * @return MediaResource
     */
    public function update(Request $request, $id)
    {
        /** @var Media $media */
        $media = Media::findOrFail($id);

        $data = $request->validate([
            'name' => 'filled|string|max:255',
            'folder_id' => 'nullable|exists:media_folders,id',
            'caption' => 'nullable|string|max:255',
            'alt_text' => 'nullable|string|max:255',
        ]);

        $media->update($data);

        return new MediaResource($media);
    }

    /**
     * Delete the specified media item.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        Media::findOrFail($id)->delete();

        return response()->noContent();
    }
}
