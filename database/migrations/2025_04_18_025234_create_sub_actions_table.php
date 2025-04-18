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
        Schema::create('sub_actions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('sub_action')->unique();
            $table->foreignUuid('action_id')->nullable()->constrained('actions')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_actions');
    }
};
