<?php

namespace App\Traits;

use App\Contracts\SynchronisesMenuItemUrls;
use App\Models\MenuItem;

trait LinkableTrait
{
    /**
     *  Binds the synchronisation of menu items to the models update event.
     */
    public function initializeLinkableTrait()
    {
        if (! $this instanceof SynchronisesMenuItemUrls) {
            return;
        }

        self::updated(function ($model) {
            $model->syncMenuItems();
        });
    }

    /**
     * Synchronises the label and url of all associated menu items.
     */
    public function syncMenuItems()
    {
        MenuItem::query()
            ->whereHasMorph(
                'linkable',
                self::class,
                function ($query) {
                    $query->where($this->getKeyName(), $this->id);
                }
            )
            ->update([
                'label' => $this->getLabel(),
                'url' => $this->getUrl(),
            ]);
    }
}
