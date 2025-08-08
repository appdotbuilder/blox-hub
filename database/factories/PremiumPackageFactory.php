<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PremiumPackage>
 */
class PremiumPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $packages = [
            ['name' => '3 Days Premium', 'duration_days' => 3, 'price' => 3.99],
            ['name' => '7 Days Premium', 'duration_days' => 7, 'price' => 5.99],
            ['name' => '30 Days Premium', 'duration_days' => 30, 'price' => 19.00],
        ];

        $package = $this->faker->randomElement($packages);

        return [
            'name' => $package['name'],
            'duration_days' => $package['duration_days'],
            'price' => $package['price'],
            'description' => "Get {$package['duration_days']} days of premium access with unlimited script downloads",
            'is_active' => true,
        ];
    }
}