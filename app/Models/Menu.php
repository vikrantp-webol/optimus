<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $dates = ['published_at'];

    public function type()
    {
        return $this->belongsTo(MenuType::class, 'type_id');
    }

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }
}
