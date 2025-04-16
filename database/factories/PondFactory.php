<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pond>
 */
class PondFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $location = Location::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'pond_id' => 'Pond ' . strtoupper(fake()->bothify('??#')), // e.g., Pond AB1
            'capacity' => fake()->numberBetween(10, 100), // Number of koi it can hold
            'ph_level' => fake()->randomFloat(2, 6.5, 8.5), // e.g., 7.25
            'temperature' => fake()->randomFloat(2, 18, 28), // °C
            'ammonia_level' => fake()->randomFloat(2, 0, 0.5), // ppm
            'location_id' => $location->id, // nullable FK from locations table
        ];
    }
}
