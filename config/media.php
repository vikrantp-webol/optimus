<?php

return [

    /*
     * The default disk where media is uploaded.
     */
    'disk' => env('MEDIA_DISK', 'public'),

    /*
     * The maximum upload file size.
     */
    'max_file_size' => env('MEDIA_MAX_FILE_SIZE', 5 * 1024),

    /*
     * The default media model.
     */
    'model' => env('MEDIA_MODEL', App\Models\Media::class),

];
