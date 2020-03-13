<?php

// Auth
Route::get('login', 'Auth\LoginController@showLoginForm');
Route::post('login', 'Auth\LoginController@login')->name('admin.login');
Route::post('logout', 'Auth\LoginController@logout')->name('admin.logout');

// Api
Route::prefix('api')
     ->middleware('auth:admin')
     ->namespace('Api')
     ->group(function () {
         Route::get('example', 'ExampleController@index');
     });

Route::view('{page?}', 'back.layouts.app')
     ->middleware('auth:admin')
     ->where('page', '.*')
     ->name('admin');
