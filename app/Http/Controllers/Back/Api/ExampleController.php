<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Controllers\Back\Controller;

class ExampleController extends Controller
{
    public function index()
    {
        return response()->json([
            'hello' => 'world',
        ]);
    }
}
