<?php

use App\Http\Controllers\WaterLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('pondsInfo/waterLogs', WaterLogController::class);
});
