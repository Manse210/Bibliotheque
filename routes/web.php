<?php

use Illuminate\Support\Facades\Route;

// API Route
Route::get('/api/hello', function () {
    return response()->json(['message' => 'Bienvenue sur l\'API de la bibliothèque !']);
});

// Toutes les autres routes sont gérées par React
Route::get('/{any}', function () {
    return view('react');
})->where('any', '.*');
