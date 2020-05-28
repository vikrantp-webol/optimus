<?php

namespace App\Registries;

use App\Contracts\Linkable;
use App\Exceptions\InvalidLinkableTypeException;

class LinkableTypes
{
    protected static $types = [];

    public static function register(array $types)
    {
        foreach ($types as $type) {
            if (! is_subclass_of($type, Linkable::class, true)) {
                throw new InvalidLinkableTypeException(
                    'The given type does not implement Linkable.'
                );
            }

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
