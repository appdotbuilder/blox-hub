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
        Schema::create('scripts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('game_title');
            $table->string('thumbnail_url')->nullable();
            $table->text('script_code');
            $table->enum('type', ['free', 'premium'])->default('free');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            $table->index('type');
            $table->index('is_featured');
            $table->index(['type', 'is_featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scripts');
    }
};