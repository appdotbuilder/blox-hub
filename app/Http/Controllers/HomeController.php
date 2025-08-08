<?php

namespace App\Http\Controllers;

use App\Models\PremiumPackage;
use App\Models\Script;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index()
    {
        $featuredPremiumScripts = Script::premium()->featured()->limit(3)->get();
        $featuredFreeScripts = Script::free()->featured()->limit(3)->get();
        $premiumPackages = PremiumPackage::active()->orderBy('price')->get();

        return Inertia::render('welcome', [
            'featuredPremiumScripts' => $featuredPremiumScripts,
            'featuredFreeScripts' => $featuredFreeScripts,
            'premiumPackages' => $premiumPackages,
        ]);
    }
}