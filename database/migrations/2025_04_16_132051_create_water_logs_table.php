<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('water_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('ph_level', 4, 2);
            $table->decimal('temperature', 4, 2);
            $table->decimal('ammonia_level', 4, 2);
            $table->text('notes')->nullable();
            $table->foreignUuid('pond_id')->nullable()->constrained('ponds')->onDelete('set null');
            $table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_logs');
    }
};
