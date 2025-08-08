<?php

namespace App\Http\Controllers;

use App\Models\Script;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScriptController extends Controller
{
    /**
     * Display scripts with filtering.
     */
    public function index(Request $request)
    {
        $type = $request->route()->parameter('type') ?? 'free';
        
        if ($type === 'premium') {
            // Check if user has premium access
            if (!auth()->check() || !auth()->user()->isPremium()) {
                return Inertia::render('scripts/premium-locked', [
                    'message' => 'Premium access required to view these scripts.',
                ]);
            }
        }

        $scripts = Script::where('type', $type)
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('game_title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(12);

        return Inertia::render("scripts/{$type}", [
            'scripts' => $scripts,
            'search' => $request->search,
        ]);
    }

    /**
     * Display a single script.
     */
    public function show(Script $script)
    {
        // Check premium access for premium scripts
        if ($script->type === 'premium' && (!auth()->check() || !auth()->user()->isPremium())) {
            return Inertia::render('scripts/premium-locked', [
                'message' => 'Premium access required to view this script.',
                'script' => $script->only(['title', 'game_title', 'thumbnail_url']),
            ]);
        }

        return Inertia::render('scripts/show', [
            'script' => $script,
        ]);
    }
}