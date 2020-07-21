<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class MenuItem extends Model implements Sortable
{
    use SortableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'url',
    ];

    /**
     * The model's sortable options.
     *
     * @var array
     */
    public $sortable = [
        'order_column_name' => 'order',
    ];

    /**
     * Build the query used to group items when sorting.
     *
     * @return Builder
     */
    public function buildSortQuery()
    {
        return static::query()->where('parent_id', $this->parent_id);
    }

    /**
     * Get the linkable relationship.
     *
     * @return MorphTo
     */
    public function linkable()
    {
        return $this->morphTo();
    }

    /**
     * Get the menu relationship.
     *
     * @return BelongsTo
     */
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
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
}
