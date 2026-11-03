<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
//use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase; // Resets the database for the test

    public function test_login_is_throttled_after_5_attempts()
    {
        // 1. Create a fake user
        $user = User::factory()->create([
            'email' => 'hacker@test.com',
            'password' => bcrypt('correct-password'),
        ]);

        // 2. Try to log in 5 times with the wrong password
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/login', [
                'email' => 'hacker@test.com',
                'password' => 'wrong-password',
            ])->assertStatus(401); // 401 Unauthorized
        }

        // 3. The 6th attempt should be BLOCKED (429 Too Many Requests)
        $this->postJson('/api/login', [
            'email' => 'hacker@test.com',
            'password' => 'wrong-password',
        ])->assertStatus(429); 
    }
}
