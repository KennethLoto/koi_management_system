<?php

namespace Database\Factories;

use App\Models\Action;
use App\Models\Pond;
use App\Models\SubAction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceLog>
 */
class MaintenanceLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $action = Action::inRandomOrder()->first();
        // Get a sub-action that belongs to the selected action
        $sub_action = $action ? $action->subActions()->inRandomOrder()->first() : null;
        $pond = Pond::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'action_id' => $action?->id,
            'sub_action_id' => $sub_action?->id,
            'notes' => fake()->optional()->sentence(),
            'pond_id' => $pond?->id,
            'user_id' => $user?->id,
        ];
    }
}
