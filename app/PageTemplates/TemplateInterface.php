<?php

namespace App\PageTemplates;

use App\Models\Page;

interface TemplateInterface
{
    public static function getId(): string;

    public static function getName(): string;

    public static function validateData(array $data);

    public static function saveData(Page $page, array $data);

    public static function resetData(Page $page);

    public static function render(Page $page);
}
