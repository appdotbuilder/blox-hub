<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PremiumKey;
use App\Models\Purchase;
use App\Models\Script;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{


    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'premium_users' => User::premiumUsers()->count(),
            'total_scripts' => Script::count(),
            'premium_scripts' => Script::premium()->count(),
            'free_scripts' => Script::free()->count(),
            'active_keys' => PremiumKey::active()->count(),
            'total_revenue' => Purchase::completed()->sum('amount'),
            'recent_purchases' => Purchase::with(['user', 'premiumPackage'])
                ->latest()
                ->limit(5)
                ->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}