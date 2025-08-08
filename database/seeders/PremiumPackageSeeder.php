<?php

namespace Database\Seeders;

use App\Models\PremiumPackage;
use Illuminate\Database\Seeder;

class PremiumPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => '3 Days Premium',
                'duration_days' => 3,
                'price' => 3.99,
                'description' => 'Get 3 days of premium access with unlimited script downloads',
                'is_active' => true,
            ],
            [
                'name' => '7 Days Premium',
                'duration_days' => 7,
                'price' => 5.99,
                'description' => 'Get 7 days of premium access with unlimited script downloads',
                'is_active' => true,
            ],
            [
                'name' => '30 Days Premium',
                'duration_days' => 30,
                'price' => 19.00,
                'description' => 'Get 30 days of premium access with unlimited script downloads',
                'is_active' => true,
            ],
        ];

        foreach ($packages as $package) {
            PremiumPackage::updateOrCreate(
                ['name' => $package['name']],
                $package
            );
        }
    }
}