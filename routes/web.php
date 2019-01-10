<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('admin/login', 'back.auth.login');
Route::view('admin/{page?}', 'back.layouts.app')->where('page', '.*');

Route::view('/', 'front.home');

Route::get('login', function () {
    auth()->loginUsingId(1);
});
