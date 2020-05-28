<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface Linkable
{
    public static function getLinkableTypeIdentifier();

    public static function getLinkableTypeName(): string;

    public function getKey();

    public function getLabel();

    public function getUrl();

    public static function buildLinkableQuery(): Builder;

    public static function buildLinkableSearchQuery(string $input): Builder;
}
