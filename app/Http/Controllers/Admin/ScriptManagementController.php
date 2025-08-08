<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScriptRequest;
use App\Http\Requests\UpdateScriptRequest;
use App\Models\Script;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScriptManagementController extends Controller
{


    /**
     * Display a listing of scripts.
     */
    public function index(Request $request)
    {
        $scripts = Script::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('game_title', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/scripts/index', [
            'scripts' => $scripts,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new script.
     */
    public function create()
    {
        return Inertia::render('admin/scripts/create');
    }

    /**
     * Store a newly created script.
     */
    public function store(StoreScriptRequest $request)
    {
        $script = Script::create($request->validated());

        return redirect()->route('admin.scripts.show', $script)
            ->with('success', 'Script created successfully.');
    }

    /**
     * Display the specified script.
     */
    public function show(Script $script)
    {
        return Inertia::render('admin/scripts/show', [
            'script' => $script,
        ]);
    }

    /**
     * Show the form for editing the specified script.
     */
    public function edit(Script $script)
    {
        return Inertia::render('admin/scripts/edit', [
            'script' => $script,
        ]);
    }

    /**
     * Update the specified script.
     */
    public function update(UpdateScriptRequest $request, Script $script)
    {
        $script->update($request->validated());

        return redirect()->route('admin.scripts.show', $script)
            ->with('success', 'Script updated successfully.');
    }

    /**
     * Remove the specified script.
     */
    public function destroy(Script $script)
    {
        $script->delete();

        return redirect()->route('admin.scripts.index')
            ->with('success', 'Script deleted successfully.');
    }
}