<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Route
Route::get('/articles', [ArticleController::class, 'index']);

// Auth Routes
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

// Private Routes (Requires Login)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Article Management
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);
});