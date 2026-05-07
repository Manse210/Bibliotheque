<?php

use Illuminate\Support\Facades\Route;
// Routes API maintenant gérées dans routes/api.php

// Toutes les autres routes sont gérées par React
Route::get('/{any}', function () {
    return view('react');
})->where('any', '.*');
