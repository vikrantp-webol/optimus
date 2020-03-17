<?php

namespace App;

use App\Contracts\PageTemplate;
use App\Exceptions\InvalidTemplateException;
use App\Exceptions\TemplateNotFoundException;

class PageTemplates
{
    /** @var array */
    protected static $templates = [];

    /**
     * Get all the registered templates.
     *
     * @return array
     */
    public static function all()
    {
        return array_values(self::$templates);
    }

    /**
     * Register the given array of templates.
     *
     * @param array $templates
     * @return void
     *
     * @throws InvalidTemplateException
     */
    public static function set(array $templates)
    {
        $classes = [];

        foreach ($templates as $i => $template) {
            if (! is_subclass_of($template, PageTemplate::class, true)) {
                throw new InvalidTemplateException(
                    "The template given at index {$i} is invalid."
                );
            }

            if ($template instanceof PageTemplate) {
                $template = get_class($template);
            }

            $classes[$template::getId()] = $template;
        }

        self::$templates = $classes;
    }

    /**
     * Get the specified template.
     *
     * @param string $id
     * @return mixed
     *
     * @throws TemplateNotFoundException
     */
    public static function get(string $id)
    {
        if (! self::exists($id)) {
            throw new TemplateNotFoundException(
                "A template with the id [{$id}] could not be found."
            );
        }

        return self::$templates[$id];
    }

    /**
     * Determine if the specified template is registered.
     *
     * @param string $id
     * @return bool
     */
    public static function exists(string $id)
    {
        return isset(self::$templates[$id]);
    }
}
