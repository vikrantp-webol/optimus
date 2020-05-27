<?php

namespace App\Traits;

use App\Contracts\SynchronisesMenuItemUrls;
use App\Models\MenuItem;

trait LinkableTrait
{
    public function initializeLinkableTrait()
    {
        if (! $this instanceof SynchronisesMenuItemUrls) {
            return;
        }

        self::updated(function ($model) {
            $model->syncMenuItemUrls();
        });
    }

    public function syncMenuItemUrls()
    {
        if (! $this->urlHasChanged()) {
            return;
        }

        MenuItem::query()
            ->whereHasMorph(
                'linkable',
                self::class,
                function ($query) {
                    $query->where($this->getKeyName(), $this->id);
                }
            )
            ->update([
                'url' => $this->getUrl(),
            ]);
    }
}
