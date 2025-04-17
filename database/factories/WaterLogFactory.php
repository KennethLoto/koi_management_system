<?php

namespace Database\Factories;

use App\Models\Pond;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WaterLog>
 */
class WaterLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pond = Pond::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'ph_level' => fake()->randomFloat(2, 6.5, 8.5),
            'temperature' => fake()->randomFloat(2, 18, 28),
            'ammonia_level' => fake()->randomFloat(2, 0, 0.5),
            'notes' => fake()->optional()->sentence(),
            'pond_id' => $pond?->id,
            'user_id' => $user?->id,
        ];
    }
}
