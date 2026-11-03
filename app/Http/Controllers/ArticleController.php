<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    public function index()
    {
        // We cache the list for 60 seconds
        return Cache::remember('articles_list', 60, function () {
            return Article::orderBy('created_at', 'desc')->paginate(10);
        });
    }

    public function store(Request $request)
    {
        // 1. Let's see exactly what Laravel receives
        \Log::info('--- NEW ARTICLE REQUEST ---');
        \Log::info('Has image file? ' . ($request->hasFile('image') ? 'YES' : 'NO'));
        \Log::info('All input data: ', $request->all());
        \Log::info('Files received: ', $request->allFiles());
        $data = $request->only('title', 'content');

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = $path;
        }

        $article = Article::create($data);
        Cache::forget('articles_list'); 

        return response()->json($article, 201);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        
        Cache::forget('articles_list'); 
        
        return response()->json(['message' => 'Deleted']);
    }
}