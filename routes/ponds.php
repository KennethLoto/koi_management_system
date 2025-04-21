<?php

use App\Http\Controllers\PondController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ponds', PondController::class);

    Route::get('/pondsInfo/waterLogs/{pond}', [PondController::class, 'waterLogs'])->name('ponds.waterLogs');

    Route::get('/pondsInfo/maintenanceLogs/{pond}', [PondController::class, 'maintenanceLogs'])->name('ponds.maintenanceLogs');
});
