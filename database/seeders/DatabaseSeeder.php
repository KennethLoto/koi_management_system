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
        // User::factory(20)->create();

        // Seed user roles first, ensure they exist in the database
        // Manually create unique roles
        $roles = ['SuperAdmin', 'Koi Keeper', 'Sales Manager', 'Veterinarian', 'Guest'];

        foreach ($roles as $role) {
            UserRole::firstOrCreate(['role' => $role]);
        }

        // Get the SuperAdmin role
        $superAdmin = UserRole::where('role', 'SuperAdmin')->first();

        // Create one user and assign the SuperAdmin role
        User::factory()->create([
            'name' => 'Kenzu',
            'email' => 'kenzu@example.com',
            'password' => '1234567890',
            'email_verified_at' => now(),
            'role_id' => $superAdmin->id,
        ]);
    }
}
