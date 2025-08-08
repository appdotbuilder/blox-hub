<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Script>
 */
class ScriptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'game_title' => $this->faker->randomElement([
                'Blox Fruits',
                'Arsenal',
                'Adopt Me',
                'Brookhaven',
                'Pet Simulator X',
                'Natural Disaster Survival',
                'Jailbreak',
                'Murder Mystery 2',
                'Tower of Hell',
                'Phantom Forces'
            ]),
            'thumbnail_url' => 'https://via.placeholder.com/300x200/6366f1/ffffff?text=' . urlencode($this->faker->word()),
            'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/script/main/script.lua"))()',
            'type' => $this->faker->randomElement(['free', 'premium']),
            'is_featured' => $this->faker->boolean(30), // 30% chance of being featured
        ];
    }

    /**
     * Indicate that the script is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'premium',
        ]);
    }

    /**
     * Indicate that the script is free.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'free',
        ]);
    }

    /**
     * Indicate that the script is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}