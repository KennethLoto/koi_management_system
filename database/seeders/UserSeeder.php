<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = UserRole::where('role', 'SuperAdmin')->first();

        User::factory()->create([
            'name' => 'Kenzu',
            'email' => 'kenzu@example.com',
            'password' => bcrypt('1234567890'),
            'email_verified_at' => now(),
            'role_id' => $superAdmin->id,
        ]);
    }
}
