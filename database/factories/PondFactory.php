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
            'pond_id' => 'Pond ' . strtoupper(fake()->bothify('??#')),
            'capacity' => fake()->numberBetween(10, 100),
            'location_id' => $location->id,
        ];
    }
}
