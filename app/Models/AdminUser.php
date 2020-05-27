<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $username
 * @property string $password
 * @property string $gravatar_url
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class AdminUser extends User
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'gravatar_url',
    ];

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
