<?php

use App\Http\Controllers\HealthStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::resource('utilities/koiUtilities/healthStatuses', HealthStatusController::class);
});
