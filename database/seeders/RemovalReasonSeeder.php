<?php

namespace Database\Seeders;

use App\Models\RemovalReason;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RemovalReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RemovalReason::factory()->count(5)->create();
    }
}
