<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class NotDescendantOrSelf implements Rule
{
    /** @var mixed */
    protected $id;

    /** @var string */
    protected $table;

    /** @var string */
    protected $parentIdColumn;

    /** @var string */
    protected $idColumn;

    public function __construct($id, $table, $parentIdColumn = 'parent_id', $idColumn = 'id')
    {
        $this->id = $id;
        $this->table = $table;
        $this->parentIdColumn = $parentIdColumn;
        $this->idColumn = $idColumn;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return ! $this->isDescendantOrSelf($value, $this->id);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('validation.exists');
    }

    /**
     * Determine if the given id is the same as,
     * or a descendant of the id on the instance.
     *
     * @param mixed $parentId
     * @param mixed $id
     * @return bool
     */
    protected function isDescendantOrSelf($parentId, $id)
    {
        if ($parentId == $id) {
            return true;
        }

        $children = DB::table($this->table)
            ->where($this->parentIdColumn, $id)
            ->get();

        if ($children->isEmpty()) {
            return false;
        }

        foreach ($children as $child) {
            if ($this->isDescendantOrSelf($parentId, $child->{$this->idColumn})) {
                return true;
            }
        }

        return false;
    }
}
