<?php

use Carbon\Carbon;
use Optimus\Pages\Page;
use App\Templates\HomeTemplate;
use Optimus\Pages\PageTemplate;
use Illuminate\Database\Seeder;
use App\Templates\DefaultTemplate;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $templates = [
            [ // 1
                'name' => 'Home',
                'component' => 'home',
                'handler' => HomeTemplate::class,
                'is_selectable' => false
            ],
            [ // 2
                'name' => 'Default',
                'component' => 'default',
                'handler' => DefaultTemplate::class,
                'is_selectable' => true
            ]
        ];

        foreach ($templates as $template) {
            PageTemplate::create($template);
        }

        $pages = [
            [ // 1
                'title' => 'Home',
                'slug' => null,
                'has_fixed_slug' => true,
                'uri' => null,
                'parent_id' => null,
                'template_id' => 1,
                'has_fixed_template' => true,
                'is_stand_alone' => false,
                'is_deletable' => false,
                'order' => 1,
                'published_at' => Carbon::now()
            ],
            [ // 2
                'title' => 'About',
                'slug' => 'about',
                'has_fixed_slug' => false,
                'uri' => 'about',
                'parent_id' => null,
                'template_id' => 2,
                'has_fixed_template' => false,
                'is_stand_alone' => false,
                'is_deletable' => true,
                'order' => 2,
                'published_at' => Carbon::now()
            ]
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
