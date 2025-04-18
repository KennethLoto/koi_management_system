<?php

namespace Database\Seeders;

use App\Models\WaterLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WaterLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WaterLog::factory()->count(5)->create();
    }
}
