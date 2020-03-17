<?php

use App\Models\AdminUser;
use Illuminate\Database\Seeder;

class AdminUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdminUser::forceCreate([
            'name' => 'Admin',
            'email' => 'dev@optixsolutions.co.uk',
            'username' => env('ADMIN_USERNAME', 'admin'),
            'password' => bcrypt(env('ADMIN_PASSWORD', 'password')),
        ]);
    }
}
