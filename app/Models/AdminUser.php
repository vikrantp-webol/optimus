<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;

class AdminUser extends User
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'username', 'password',
    ];

    /**
     * The attributes that should be visible in serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the user's gravatar url.
     *
     * @return string
     */
    public function getGravatarUrlAttribute()
    {
        $hash = md5(strtolower(trim($this->email)));

        return "https://www.gravatar.com/avatar/{$hash}";
    }
}
