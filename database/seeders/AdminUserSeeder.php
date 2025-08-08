<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'dimasalmactar12@gmail.com'],
            [
                'name' => 'Admin User',
                'email' => 'dimasalmactar12@gmail.com',
                'password' => Hash::make('mabal123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}