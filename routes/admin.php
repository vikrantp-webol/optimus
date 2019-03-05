<?php

// Auth
Route::get('login', 'Auth\LoginController@showLoginForm');
Route::post('login', 'Auth\LoginController@login')->name('admin.login');
Route::post('logout', 'Auth\LoginController@logout')->name('admin.logout');

// Api
Route::prefix('api')->middleware('auth:admin')->group(function () {
    // Register your routes here...
});

Route::view('{page?}', 'admin.layouts.app')
     ->middleware('auth:admin')
     ->where('page', '.*')
     ->name('admin');
