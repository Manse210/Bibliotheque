<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Bienvenue sur Laravel !';
});

Route::get('/bonjour', function () {
    return 'Bonjour tout le monde !';
});

Route::get('/livres', function () {
    return view('livre');
});
Route::get('/api/hello', function () {
    return response()->json(['message' => 'Bienvenue sur l\'API de la bibliothèque !']);
});Route::get('/test-react', function () { return view('react'); });
