<?php

namespace Database\Seeders;

use App\Models\HealthStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HealthStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HealthStatus::factory()->count('5')->create();
    }
}
