<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class KeyController extends Controller
{
    /**
     * Display the get free key page.
     */
    public function index()
    {
        return Inertia::render('keys/get-free-key');
    }

    /**
     * Store/fetch the free key from GitHub repository.
     */
    public function store(Request $request)
    {
        try {
            $githubRepoUrl = SiteSetting::get('github_repo_url');
            $githubToken = SiteSetting::get('github_token');

            if (!$githubRepoUrl || !$githubToken) {
                return response()->json([
                    'success' => false,
                    'message' => 'GitHub configuration not set up. Please contact administrator.',
                ], 500);
            }

            // Simulate GitHub API call to fetch the key
            // In a real implementation, you would make an actual API call to GitHub
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $githubToken,
                'Accept' => 'application/vnd.github.v3+json',
            ])->get($githubRepoUrl);

            if ($response->successful()) {
                // Generate a random free key for demonstration
                $freeKey = 'FREE_' . strtoupper(substr(hash('sha256', uniqid()), 0, 16));
                
                return response()->json([
                    'success' => true,
                    'key' => $freeKey,
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch key from repository.',
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching the key.',
            ], 500);
        }
    }

    /**
     * Display user's premium key status.
     */
    public function show()
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        $activeKey = $user->getActivePremiumKey();

        return Inertia::render('keys/premium-status', [
            'activeKey' => $activeKey,
            'user' => $user->only(['name', 'email', 'role', 'premium_expires_at']),
        ]);
    }
}