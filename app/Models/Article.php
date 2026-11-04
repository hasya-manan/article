<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    
 use HasFactory , HasUuids;

    // This tells Laravel: "It is safe to save these fields"
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
