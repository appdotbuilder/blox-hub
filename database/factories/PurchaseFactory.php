<?php

namespace Database\Factories;

use App\Models\PremiumPackage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'premium_package_id' => PremiumPackage::factory(),
            'paypal_transaction_id' => $this->faker->uuid(),
            'amount' => $this->faker->randomFloat(2, 3.99, 19.00),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'paypal_response' => [
                'id' => $this->faker->uuid(),
                'status' => 'COMPLETED',
                'amount' => $this->faker->randomFloat(2, 3.99, 19.00),
            ],
        ];
    }

    /**
     * Indicate that the purchase is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}