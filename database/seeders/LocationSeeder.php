<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = ['Indoor', 'Outdoor'];

        foreach ($locations as $location) {
            Location::firstOrCreate(['location' => $location]);
        }
    }
}
