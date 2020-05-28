<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_deletable' => 'bool',
    ];

    /** @var string */
    const PRIMARY = 'primary';

    /**
     * Retrieves the menu with the given identifier.
     *
     * @param string $identifier
     * @return mixed
     */
    public static function findByIdentifierOrFail(string $identifier)
    {
        return static::where('identifier', $identifier)->firstOrFail();
    }

    /**
     * Get the items relationship.
     *
     * @return HasMany
     */
    public function items()
    {
        return $this->hasMany(MenuItem::class, 'menu_id');
    }
}
