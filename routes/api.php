<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\LecteurController;
use App\Http\Controllers\EmpruntController;
use App\Http\Controllers\DashboardController;

// Route de test
Route::get('/hello', function () {
    return response()->json(['message' => 'Bienvenue sur l\'API de la bibliothèque !']);
});

// Route Dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Routes pour les livres
Route::apiResource('livres', CatalogueController::class);

// Routes pour les lecteurs
Route::apiResource('lecteurs', LecteurController::class);

// Routes pour les emprunts
Route::apiResource('emprunts', EmpruntController::class);
// Route spéciale pour retour d'emprunt
Route::put('/emprunts/{id}/retour', [EmpruntController::class, 'retour']);