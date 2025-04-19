<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('utilities', function () {
        return Inertia::render('Utilities/Index');
    })->name('utilities');

    Route::get('utilities/pondUtilities', function () {
        return Inertia::render('Utilities/PondUtilities/Index');
    })->name('utilities/pondUtilities');

    Route::get('utilities/userUtilities', function () {
        return Inertia::render('Utilities/UserUtilities/Index');
    })->name('utilities/userUtilities');
});
