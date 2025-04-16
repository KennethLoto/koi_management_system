<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('utilities', function () {
        return Inertia::render('Utilities/Index');
    })->name('utilities');
});
