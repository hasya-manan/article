<?php

use App\Models\User;
use App\Models\Article; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Wrong credentials'], 401);
    }
    auth()->login($user);
    return response()->json(['user' => $user]);
})->middleware('throttle:5,1'); //rate limit to 5 attempts per minute to prevent brute force attacks

// --- PUBLIC ROUTE (No login required) ---
Route::get('/articles', function () {
    return Cache::remember('articles_list', 60, function () {
        return Article::orderBy('created_at', 'desc')->paginate(10);
    });
});

// --- PRIVATE ROUTES (Requires login) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $r) => $r->user());
    
    // Creating an article requires login
    Route::post('/articles', function (Request $request) {
        $article = Article::create($request->only('title', 'content'));
        Cache::forget('articles_list'); 
        return response()->json($article, 201);
    });

        Route::post('/logout', function (Request $request) {
        // 1. Log the user out
        Auth::guard('web')->logout();
        
        // 2. Clear the session safely
        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json(['message' => 'Logged out successfully']);
    });
});