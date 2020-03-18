<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Optix\Media\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    /** @var string */
    const THUMBNAIL_CONVERSION = '400x300';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'folder_id', 'name', 'alt_text', 'caption',
        'file_name', 'disk', 'mime_type', 'size',
    ];

    /**
     * Apply filters to the query.
     *
     * @param Builder $query
     * @param array $filters
     * @return void
     */
    public function scopeApplyFilters(Builder $query, array $filters)
    {
        // Folder
        if (! empty($filters['folder'])) {
            $folder = $filters['folder'];

            if ($folder === 'root') {
                $folder = null;
            }

            $query->where('folder_id', $folder);
        }
    }

    /**
     * Get the folder relationship.
     *
     * @return BelongsTo
     */
    public function folder()
    {
        return $this->belongsTo(MediaFolder::class, 'folder_id');
    }
}
