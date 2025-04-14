<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(20)->create();

        User::factory()->create([
            'name' => 'Kenzu',
            'email' => 'kenzu@example.com',
            'password' => '1234567890',
            'email_verified_at' => now(),
            'role' => 'SuperAdmin'
        ]);

        UserRole::factory()->create([
            'role' => 'SuperAdmin'
        ]);
        UserRole::factory()->create([
            'role' => 'Koi Keeper'
        ]);
        UserRole::factory()->create([
            'role' => 'Sales Manager'
        ]);
        UserRole::factory()->create([
            'role' => 'Veterinarian'
        ]);
        UserRole::factory()->create([
            'role' => 'Guest'
        ]);
    }
}
