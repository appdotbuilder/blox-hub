<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ScriptManagementController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KeyController;
use App\Http\Controllers\PremiumController;
use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public script routes  
Route::get('/scripts/free', [ScriptController::class, 'index'])->defaults('type', 'free')->name('scripts.free');
Route::get('/scripts/premium', [ScriptController::class, 'index'])->defaults('type', 'premium')->name('scripts.premium');
Route::get('/scripts/{script}', [ScriptController::class, 'show'])->where('script', '[0-9]+')->name('scripts.show');

// Key management routes
Route::controller(KeyController::class)->group(function () {
    Route::get('/get-free-key', 'index')->name('keys.free');
    Route::post('/get-free-key', 'store')->name('keys.store');
    Route::get('/premium-key-status', 'show')->name('keys.premium-status')->middleware('auth');
});

// Premium package routes
Route::controller(PremiumController::class)->group(function () {
    Route::get('/premium', 'index')->name('premium.index');
    Route::post('/premium', 'store')->name('premium.store');
    Route::patch('/premium/{purchase}', 'update')->name('premium.update');
    Route::get('/premium/{purchase}/failed', 'show')->name('premium.show');
});

// Dashboard routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin routes
Route::middleware(['auth', 'verified', \App\Http\Middleware\AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Script management
    Route::resource('scripts', ScriptManagementController::class);
    
    // Settings
    Route::controller(SettingsController::class)->group(function () {
        Route::get('/settings', 'index')->name('settings.index');
        Route::post('/settings', 'update')->name('settings.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';