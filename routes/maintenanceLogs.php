<?php

use App\Http\Controllers\MaintenanceLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('pondsInfo/maintenanceLogs', MaintenanceLogController::class);
});
