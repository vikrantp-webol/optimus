<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class MenuItem extends Model implements Sortable
{
    use SortableTrait;

    public $fillable = [
        'url',
    ];

    public $sortable = [
        'order_column_name' => 'order',
    ];

    public function buildSortQuery()
    {
        return static::query()->where('parent_id', $this->parent_id);
    }

    public function linkable()
    {
        return $this->morphTo();
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
