<?php

namespace Database\Seeders;

use App\Models\User;
//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Editor In Chief',
            'email' => 'editor@example.com',
            'password' => Hash::make('password123'),
        ]);

        // You can add more dummy users if you'd like
        User::factory()->count(3)->create(); 
    }
}
