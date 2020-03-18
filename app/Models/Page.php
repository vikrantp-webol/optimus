<?php

namespace App\Models;

use App\PageTemplates;
use App\Traits\HasSeoFields;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Optix\Draftable\Draftable;
use Optix\Media\HasMedia;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Page extends Model implements Sortable
{
    use Draftable,
        HasMedia,
        HasSeoFields,
        HasSlug,
        SortableTrait;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'has_fixed_template' => 'bool',
        'has_fixed_path' => 'bool',
        'is_standalone' => 'bool',
        'is_deletable' => 'bool',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'published_at',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'template_id', 'parent_id', 'is_standalone',
    ];

    /**
     * The model's sortable options.
     *
     * @var array
     */
    protected $sortable = [
        'order_column_name' => 'order',
    ];

    /**
     * Get the model's slug options.
     *
     * @return SlugOptions
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->doNotGenerateSlugsOnUpdate()
            ->saveSlugsTo('slug');
    }

    /**
     * Determine if another record exists with the given slug.
     *
     * @param string $slug
     * @return bool
     */
    protected function otherRecordExistsWithSlug(string $slug): bool
    {
        return $this->newQueryWithoutScopes()
            ->where($this->slugOptions->slugField, $slug)
            ->where($this->getKeyName(), '!=', $this->getKey() ?? '0')
            ->where('parent_id', $this->parent_id)
            ->exists();
    }

    /**
     * Build the sort query.
     *
     * @return Builder
     */
    public function buildSortQuery()
    {
        return $this->newQuery()->where(
            'parent_id', $this->parent_id
        );
    }

    /**
     * Apply filters to the query.
     *
     * @param Builder $query
     * @param array $filters
     * @return void
     */
    public function scopeApplyFilters(Builder $query, array $filters)
    {
        // Parent
        if (isset($filters['parent'])) {
            $parent = $filters['parent'];

            if ($parent === 'root') {
                $parent = null;
            }

            $query->where('parent_id', $parent);
        }
    }

    /**
     * Build the page's path.
     *
     * @return string
     */
    public function buildPath()
    {
        if ($this->has_fixed_path) {
            return $this->path;
        }

        $prefix = '';

        $parent = $this->parent;

        if ($parent && $prefix = $parent->path) {
            $prefix .= '/';
        }

        return $prefix.$this->slug;
    }

    /**
     * Get the page's template class.
     *
     * @return string
     */
    public function template()
    {
        return PageTemplates::get($this->template_id);
    }

    public function addContent($key, $value)
    {
        $content = new PageContent([
            'key' => $key,
            'value' => $value,
        ]);

        return $this->contents()->save($content);
    }

    public function addContents(array $contents)
    {
        $models = $this->newCollection();

        foreach ($contents as $key => $value) {
            $models->add($this->addContent($key, $value));
        }

        return $models;
    }

    public function getContent($key, $default = null)
    {
        foreach ($this->contents as $content) {
            if ($content->key === $key) {
                return $content->value;
            }
        }

        return $default;
    }

    public function hasContent($key)
    {
        foreach ($this->contents as $content) {
            if ($content->key === $key) {
                return true;
            }
        }

        return false;
    }

    public function clearContents()
    {
        return $this->contents()->delete();
    }

    /**
     * Get the parent relationship.
     *
     * @return BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * Get the children relationship.
     *
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * Get the contents relationship.
     *
     * @return HasMany
     */
    public function contents()
    {
        return $this->hasMany(PageContent::class, 'page_id');
    }
}
