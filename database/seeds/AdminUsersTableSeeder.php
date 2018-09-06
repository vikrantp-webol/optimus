<?php

use Optimus\Users\AdminUser;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class AdminUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            Permission::create(['name' => 'manage pages', 'guard_name' => 'admin']),
            Permission::create(['name' => 'manage blog', 'guard_name' => 'admin']),
            Permission::create(['name' => 'manage users', 'guard_name' => 'admin'])
        ];

        $user = AdminUser::create([
            'name' => 'Admin',
            'email' => 'dev@optixsolutions.co.uk',
            'username' => env('ADMIN_USERNAME', 'admin'),
            'password' => bcrypt(env('ADMIN_PASSWORD', 'password'))
        ]);

        $user->givePermissionTo($permissions);
    }
}
