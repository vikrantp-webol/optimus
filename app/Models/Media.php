<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Optix\Media\Models\Media as BaseMedia;

/**
 * @property int $id
 * @property int|null $folder_id
 * @property MediaFolder|null $folder
 * @property string $name
 * @property string $file_name
 * @property string $disk
 * @property string $mime_type
 * @property int $size
 * @property string|null $alt_text
 * @property string|null $caption
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
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
        'folder_id', 'name', 'file_name', 'disk',
        'mime_type', 'size', 'alt_text', 'caption',
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
