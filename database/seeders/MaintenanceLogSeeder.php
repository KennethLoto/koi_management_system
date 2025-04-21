<?php

namespace Database\Seeders;

use App\Models\MaintenanceLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaintenanceLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MaintenanceLog::factory()->count('10')->create();
    }
}
