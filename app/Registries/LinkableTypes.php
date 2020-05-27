<?php

namespace App\Registries;

use InvalidArgumentException;

class LinkableTypes
{
    protected static $types = [];

    public static function register(array $types)
    {
        foreach ($types as $type) {
            // Todo: Verify that $type is linkable...

            $identifier = $type::getLinkableTypeIdentifier();

            self::$types[$identifier] = $type;
        }
    }

    public static function all(): array
    {
        return array_values(self::$types);
    }

    public static function get(string $identifier): string
    {
        if (! self::exists($identifier)) {
            throw new InvalidArgumentException(
                'Linkable type does not exist.'
            );
        }

        return self::$types[$identifier];
    }

    public static function exists(string $identifier): bool
    {
        return isset(self::$types[$identifier]);
    }
}
