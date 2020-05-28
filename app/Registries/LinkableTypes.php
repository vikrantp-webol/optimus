<?php

namespace App\Registries;

use App\Contracts\Linkable;
use App\Exceptions\InvalidLinkableTypeException;

class LinkableTypes
{
    /** @var array */
    protected static $types = [];

    /**
     * Get all the registered linkable types.
     *
     * @return array
     */
    public static function all(): array
    {
        return array_values(self::$types);
    }

    /**
     * Registers the provided classes as linkable types.
     *
     * @param array $types
     * @throws InvalidLinkableTypeException
     */
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

    /**
     * Get the specified linkable type.
     *
     * @param string $identifier
     * @return mixed
     *
     * @throws InvalidArgumentException
     */
    public static function get(string $identifier): string
    {
        if (! self::exists($identifier)) {
            throw new InvalidArgumentException(
                'Linkable type does not exist.'
            );
        }

        return self::$types[$identifier];
    }

    /**
     * Determine if the specified linkable type is registered.
     *
     * @param string $identifier
     * @return bool
     */
    public static function exists(string $identifier): bool
    {
        return isset(self::$types[$identifier]);
    }
}
