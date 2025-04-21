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
        Schema::create('maintenance_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('action_id')->nullable()->constrained('actions')->onDelete('set null');
            $table->foreignUuid('sub_action_id')->nullable()->constrained('sub_actions')->onDelete('set null');
            $table->string('notes')->nullable();
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
        Schema::dropIfExists('maintenance_logs');
    }
};
