<?php

namespace App\PageTemplates;

// TemplateRegistry::set([
//
// ]);

class TemplateRegistry
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
     */
    public static function set(array $templates)
    {
        $classes = [];

        foreach ($templates as $i => $template) {
            //

            if (! is_subclass_of($template, TemplateInterface::class, true)) {
                throw new InvalidPageTemplateException(
                    "The page template given at index {$i} [{$template}] is invalid."
                );
            }

            if ($template instanceof TemplateInterface) {
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
     */
    public static function get($id)
    {
        if (! self::exists($id)) {
            // ...
        }

        return self::$templates[$id];
    }

    /**
     * Determine if the specified template is registered.
     *
     * @param string $id
     * @return bool
     */
    public static function exists($id)
    {
        return isset(self::$templates[$id]);
    }
}
