<?php

namespace App\Models;

use App\Contracts\Linkable;
use App\Contracts\SynchronisesMenuItemUrls;
use App\Registries\PageTemplates;
use App\Traits\HasSeoFields;
use App\Traits\LinkableTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Optix\Draftable\Draftable;
use Optix\Media\HasMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * @property int $id
 * @property string $title
 * @property string|null $slug
 * @property string|null $path
 * @property bool $has_fixed_path
 * @property int|null $parent_id
 * @property Page|null $parent
 * @property Collection<Page> $children
 * @property int $template_id
 * @property bool $has_fixed_template
 * @property bool $is_standalone
 * @property bool $is_deletable
 * @property Collection<PageContent> $contents
 * @property Carbon|null $published_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Page extends Model implements Linkable, SynchronisesMenuItemUrls
{
    use Draftable,
        HasMedia,
        HasSeoFields,
        HasSlug,
        LinkableTrait;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'has_fixed_path' => 'bool',
        'has_fixed_template' => 'bool',
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
        'title', 'slug', 'parent_id', 'template_id', 'is_standalone',
    ];

    /**
     * Returns the linkable type identifier for this model instance.
     *
     * @return string
     */
    public static function getLinkableTypeIdentifier(): string
    {
        return 'pages';
    }

    /**
     * Returns the linkable type name for this model instance.
     *
     * @return string
     */
    public static function getLinkableTypeName(): string
    {
        return 'Pages';
    }

    /**
     * Returns the menu label for this model instance.
     *
     * @return string
     */
    public function getLabel(): string
    {
        return $this->title;
    }

    /**
     * Builds the page URL for this model instance.
     *
     * @return string
     */
    public function getUrl(): string
    {
        return url()->to($this->path);
    }

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

    /**
     * Adds content to this page at the provided key.
     *
     * @param $key
     * @param $value
     * @return bool|false|Model
     */
    public function addContent($key, $value)
    {
        $content = new PageContent([
            'key' => $key,
            'value' => $value,
        ]);

        return $this->contents()->save($content);
    }

    /**
     * Adds an array of content to this page.
     *
     * @param array $contents
     * @return Collection
     */
    public function addContents(array $contents)
    {
        $models = $this->newCollection();

        foreach ($contents as $key => $value) {
            $models->add($this->addContent($key, $value));
        }

        return $models;
    }

    /**
     * Retrieves the page content associated with the provided key.
     *
     * @param $key
     * @param null $default
     * @return |null
     */
    public function getContent($key, $default = null)
    {
        foreach ($this->contents as $content) {
            if ($content->key === $key) {
                return $content->value;
            }
        }

        return $default;
    }

    /**
     * Determines if the page has content associated with the provided key.
     *
     * @param $key
     * @return bool
     */
    public function hasContent($key)
    {
        foreach ($this->contents as $content) {
            if ($content->key === $key) {
                return true;
            }
        }

        return false;
    }

    /**
     * Removes all content from this page.
     *
     * @return mixed
     */
    public function clearContents()
    {
        return $this->contents()->delete();
    }

    /**
     * Determines if the URL for this instance has changed since the last save.
     *
     * @return bool
     */
    public function urlHasChanged(): bool
    {
        return $this->isDirty('path');
    }

    /**
     * Builds the query used to retrieve linkable page items.
     *
     * @return Builder
     */
    public static function buildLinkableQuery(): Builder
    {
        return self::query();
    }

    /**
     * Builds the search query used to find linkable page items matching the provided query.
     *
     * @param string $input
     * @return Builder
     */
    public static function buildLinkableSearchQuery(string $input): Builder
    {
        return self::buildLinkableQuery()->where(
            'title', 'like', '%'.$input.'%'
        );
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
