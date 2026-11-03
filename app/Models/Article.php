<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    
 use HasFactory;

    // This tells Laravel: "It is safe to save these fields"
    protected $fillable = [
        'title',
        'content',
        'image'
    ];
}
