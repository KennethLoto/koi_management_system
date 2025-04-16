<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserRole;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['SuperAdmin', 'Koi Keeper', 'Sales Manager', 'Veterinarian', 'Guest'];

        foreach ($roles as $role) {
            UserRole::firstOrCreate(['role' => $role]);
        }
    }
}
