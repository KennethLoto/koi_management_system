<?php

use App\Http\Controllers\PondController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ponds', PondController::class);

    Route::get('/pondsInfo/waterLogs/{pond}', [PondController::class, 'logs'])->name('ponds.logs');
});
