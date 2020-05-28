<?php

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Menu::forceCreate([
            'name' => 'Primary Navigation',
            'identifier' => Menu::PRIMARY,
            'is_deletable' => false,
        ]);
    }
}
