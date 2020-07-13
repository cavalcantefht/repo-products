<?php

use Illuminate\Support\Facades\Route;

Route::post('auth/login', 'AuthController@login');

Route::group(['middleware' => ['apiJwt']], function () {
    Route::get('categories/{category}/products', 'ProductController@index');
    Route::get('users', 'UserController@index');
    Route::post('users', 'UserController@store');
    Route::resource('categories', 'CategoryController')
        ->except(['edit', 'create']);
    Route::resource('products', 'ProductController')
        ->except(['edit', 'create']);
});
