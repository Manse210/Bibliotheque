<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Bienvenue sur Laravel !';
});

Route::get('/bonjour', function () {
    return 'Bonjour tout le monde !';
});