<?php

namespace App\Http\Controllers;

use App\Models\PremiumPackage;
use App\Models\PremiumKey;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PremiumController extends Controller
{
    /**
     * Display premium packages.
     */
    public function index()
    {
        $packages = PremiumPackage::active()->orderBy('price')->get();

        return Inertia::render('premium/packages', [
            'packages' => $packages,
        ]);
    }

    /**
     * Store a premium package purchase.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'package_id' => 'required|exists:premium_packages,id',
        ]);

        $package = PremiumPackage::findOrFail($request->package_id);

        // Find or create user
        $user = User::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => explode('@', $request->email)[0],
                'password' => Hash::make(Str::random(12)),
                'role' => 'free',
            ]
        );

        // Create purchase record
        $purchase = Purchase::create([
            'user_id' => $user->id,
            'premium_package_id' => $package->id,
            'amount' => $package->price,
            'status' => 'pending',
        ]);

        // Simulate PayPal payment process
        return Inertia::render('premium/payment', [
            'package' => $package,
            'purchase' => $purchase,
            'user' => $user->only(['name', 'email']),
        ]);
    }

    /**
     * Update purchase after successful payment.
     */
    public function update(Request $request, Purchase $purchase)
    {
        $request->validate([
            'paypal_transaction_id' => 'required|string',
            'paypal_response' => 'nullable|array',
        ]);

        // Update purchase status
        $purchase->update([
            'status' => 'completed',
            'paypal_transaction_id' => $request->paypal_transaction_id,
            'paypal_response' => $request->paypal_response,
        ]);

        // Update user premium status
        $user = $purchase->user;
        $expiresAt = now()->addDays($purchase->premiumPackage->duration_days);
        
        $user->update([
            'role' => 'premium',
            'premium_expires_at' => $expiresAt,
        ]);

        // Generate 10 premium keys
        $keys = [];
        for ($i = 0; $i < 10; $i++) {
            $key = 'PREMIUM_' . strtoupper(Str::random(16));
            
            PremiumKey::create([
                'user_id' => $user->id,
                'key' => $key,
                'expires_at' => $expiresAt,
                'is_active' => true,
            ]);

            $keys[] = $key;
        }

        return Inertia::render('premium/success', [
            'keys' => $keys,
            'user' => $user->only(['name', 'email']),
            'package' => $purchase->premiumPackage,
            'expiresAt' => $expiresAt,
        ]);
    }

    /**
     * Show failed payment page.
     */
    public function show(Purchase $purchase)
    {
        $purchase->update([
            'status' => 'failed',
        ]);

        return Inertia::render('premium/failed', [
            'purchase' => $purchase,
        ]);
    }
}