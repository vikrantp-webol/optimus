<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property MediaFolder|null $parent
 * @property Collection<MediaFolder> $children
 * @property Collection<Media> $media
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class MediaFolder extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'parent_id',
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
        // Parent
        if (! empty($filters['parent'])) {
            $parent = $filters['parent'];

            if ($parent === 'root') {
                $parent = null;
            }

            $query->where('parent_id', $parent);
        }
    }

    /**
     * Get the parent relationship.
     *
     * @return BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * Get the children relationship.
     *
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * Get the media relationship.
     *
     * @return HasMany
     */
    public function media()
    {
        return $this->hasMany(Media::class, 'folder_id');
    }
}
