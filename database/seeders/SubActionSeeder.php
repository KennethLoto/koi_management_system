<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\SubAction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all action IDs to use for the foreign key
        $actionIds = Action::pluck('id');

        // Create 20 sub-actions with random action relationships
        SubAction::factory()
            ->count(20)
            ->create([
                'action_id' => function () use ($actionIds) {
                    // Randomly assign an action or leave it null (since it's nullable)
                    return rand(0, 1) ? $actionIds->random() : null;
                }
            ]);
    }
}
