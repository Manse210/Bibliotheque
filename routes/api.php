<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\LecteurController;
use App\Http\Controllers\EmpruntController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

// Routes d'authentification
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

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
});