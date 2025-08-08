<?php

namespace Database\Seeders;

use App\Models\Script;
use Illuminate\Database\Seeder;

class SampleScriptsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $scripts = [
            // Premium Scripts
            [
                'title' => 'Premium Auto Farm Script',
                'game_title' => 'Blox Fruits',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Blox+Fruits',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/premium-autofarm/main/script.lua"))()',
                'type' => 'premium',
                'is_featured' => true,
            ],
            [
                'title' => 'Premium ESP & Aimbot',
                'game_title' => 'Arsenal',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Arsenal',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/premium-esp/main/script.lua"))()',
                'type' => 'premium',
                'is_featured' => true,
            ],
            [
                'title' => 'Premium Speed Hack',
                'game_title' => 'Brookhaven',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Brookhaven',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/premium-speed/main/script.lua"))()',
                'type' => 'premium',
                'is_featured' => true,
            ],
            
            // Free Scripts
            [
                'title' => 'Basic Auto Clicker',
                'game_title' => 'Pet Simulator X',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/10b981/ffffff?text=Pet+Simulator+X',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/free-autoclicker/main/script.lua"))()',
                'type' => 'free',
                'is_featured' => true,
            ],
            [
                'title' => 'Simple Fly Script',
                'game_title' => 'Natural Disaster Survival',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/10b981/ffffff?text=Natural+Disaster',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/free-fly/main/script.lua"))()',
                'type' => 'free',
                'is_featured' => true,
            ],
            [
                'title' => 'Basic Walkspeed',
                'game_title' => 'Adopt Me',
                'thumbnail_url' => 'https://via.placeholder.com/300x200/10b981/ffffff?text=Adopt+Me',
                'script_code' => 'loadstring(game:HttpGet("https://raw.githubusercontent.com/example/free-walkspeed/main/script.lua"))()',
                'type' => 'free',
                'is_featured' => true,
            ],
        ];

        foreach ($scripts as $script) {
            Script::updateOrCreate(
                ['title' => $script['title']],
                $script
            );
        }
    }
}