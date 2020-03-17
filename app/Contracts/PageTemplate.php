<?php

namespace App\Contracts;

use App\Models\Page;

interface PageTemplate
{
    public static function getId(): string;

    public static function getName(): string;

    public static function validateData(array $data);

    public static function saveData(Page $page, array $data);

    public static function resetData(Page $page);

    public static function render(Page $page);
}
