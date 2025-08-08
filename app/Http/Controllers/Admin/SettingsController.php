<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{


    /**
     * Display site settings.
     */
    public function index()
    {
        $settings = [
            'site' => [
                'site_title' => SiteSetting::get('site_title'),
                'site_logo' => SiteSetting::get('site_logo'),
            ],
            'paypal' => [
                'paypal_mode' => SiteSetting::get('paypal_mode'),
                'paypal_client_id' => SiteSetting::get('paypal_client_id'),
                'paypal_client_secret' => SiteSetting::get('paypal_client_secret'),
            ],
            'gmail' => [
                'gmail_client_id' => SiteSetting::get('gmail_client_id'),
                'gmail_client_secret' => SiteSetting::get('gmail_client_secret'),
            ],
            'ads' => [
                'ads_banner_code' => SiteSetting::get('ads_banner_code'),
                'ads_popunder_code' => SiteSetting::get('ads_popunder_code'),
                'ads_social_bar_code' => SiteSetting::get('ads_social_bar_code'),
                'ads_native_banner_code' => SiteSetting::get('ads_native_banner_code'),
            ],
            'discord' => [
                'discord_token' => SiteSetting::get('discord_token'),
                'discord_premium_role_id' => SiteSetting::get('discord_premium_role_id'),
                'discord_guild_id' => SiteSetting::get('discord_guild_id'),
                'discord_client_id' => SiteSetting::get('discord_client_id'),
                'discord_api_url' => SiteSetting::get('discord_api_url'),
            ],
            'github' => [
                'github_repo_url' => SiteSetting::get('github_repo_url'),
                'github_token' => SiteSetting::get('github_token'),
            ],
        ];

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update site settings.
     */
    public function update(Request $request)
    {
        $request->validate([
            'category' => 'required|in:site,paypal,gmail,ads,discord,github',
        ]);

        $category = $request->category;
        $data = $request->except(['category']);

        foreach ($data as $key => $value) {
            SiteSetting::set($key, $value);
        }

        return back()->with('success', ucfirst($category) . ' settings updated successfully.');
    }


}