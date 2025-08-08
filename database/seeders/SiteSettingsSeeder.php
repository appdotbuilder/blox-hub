<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Site Configuration
            ['key' => 'site_title', 'value' => 'BloxHub - Roblox Script Hub', 'type' => 'text'],
            ['key' => 'site_logo', 'value' => '/logo.svg', 'type' => 'text'],
            
            // PayPal Settings
            ['key' => 'paypal_mode', 'value' => 'sandbox', 'type' => 'text'],
            ['key' => 'paypal_client_id', 'value' => '', 'type' => 'text'],
            ['key' => 'paypal_client_secret', 'value' => '', 'type' => 'text'],
            
            // Gmail API Settings
            ['key' => 'gmail_client_id', 'value' => '', 'type' => 'text'],
            ['key' => 'gmail_client_secret', 'value' => '', 'type' => 'text'],
            
            // Ad Settings
            ['key' => 'ads_banner_code', 'value' => '', 'type' => 'text'],
            ['key' => 'ads_popunder_code', 'value' => '', 'type' => 'text'],
            ['key' => 'ads_social_bar_code', 'value' => '', 'type' => 'text'],
            ['key' => 'ads_native_banner_code', 'value' => '', 'type' => 'text'],
            
            // Discord Bot Settings
            ['key' => 'discord_token', 'value' => '', 'type' => 'text'],
            ['key' => 'discord_premium_role_id', 'value' => '', 'type' => 'text'],
            ['key' => 'discord_guild_id', 'value' => '', 'type' => 'text'],
            ['key' => 'discord_client_id', 'value' => '', 'type' => 'text'],
            ['key' => 'discord_api_url', 'value' => '', 'type' => 'text'],
            
            // GitHub Settings for Free Keys
            ['key' => 'github_repo_url', 'value' => '', 'type' => 'text'],
            ['key' => 'github_token', 'value' => '', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}