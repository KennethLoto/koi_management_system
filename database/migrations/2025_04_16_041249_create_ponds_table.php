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
        Schema::create('ponds', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('pond_id')->unique();
            $table->integer('capacity');
            $table->decimal('ph_level', 4, 2)->nullable();
            $table->decimal('temperature', 4, 2)->nullable();
            $table->decimal('ammonia_level', 4, 2)->nullable();
            $table->foreignUuid('location_id')->nullable()->constrained('locations')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ponds');
    }
};
