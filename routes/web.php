<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/utilities.php';
require __DIR__ . '/users.php';
require __DIR__ . '/userRoles.php';
require __DIR__ . '/locations.php';
require __DIR__ . '/ponds.php';
require __DIR__ . '/removalReasons.php';
require __DIR__ . '/waterLogs.php';
require __DIR__ . '/actions.php';
require __DIR__ . '/subActions.php';
require __DIR__ . '/maintenanceLogs.php';
require __DIR__ . '/genders.php';
require __DIR__ . '/breeds.php';
require __DIR__ . '/healthStatuses.php';
