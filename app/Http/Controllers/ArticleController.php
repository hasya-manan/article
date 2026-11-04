<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    public function index()
    {
        // Get the current page number from the request (defaults to 1)
        $page = request()->get('page', 1);

        // Make the cache key unique per page
        return Cache::remember('articles_list_page_' . $page, 60, function () {
            return Article::with('user')->orderBy('created_at', 'desc')->paginate(10);
        });
    }

   public function store(Request $request)
    {
        // 1. Validate incoming data
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // 2. Attach the currently logged-in user's ID
        $validated['user_id'] = $request->user()->id;

        // 3. Handle image upload if a file was provided
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('articles', 'public');
        }

        // 4. Create the article using the validated data array
        $article = Article::create($validated);

        // 5. Clear the cache so the new article shows up immediately
        Cache::flush(); 

        return response()->json([
            'message' => 'Article created successfully!',
            'article' => $article
        ], 201);
    }
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        
        Cache::forget('articles_list'); 
        
        return response()->json(['message' => 'Deleted']);
    }

    // Get a single article for editing
    public function show($id)
    {
        $article = Article::with('user')->findOrFail($id);
        return response()->json($article);
    }

    // Update the article
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        // Optional Security: Check if the logged-in user owns the article
        if ($article->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle new image upload if provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($article->image && \Storage::disk('public')->exists($article->image)) {
                \Storage::disk('public')->delete($article->image);
            }
            $validated['image'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($validated);
        
        // Clear cache so changes reflect instantly
        Cache::flush();

        return response()->json([
            'message' => 'Article updated successfully!',
            'article' => $article
        ]);
    }
}