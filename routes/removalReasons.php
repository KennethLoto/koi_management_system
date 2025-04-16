<?php

use App\Http\Controllers\RemovalReasonController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('removalReasons', RemovalReasonController::class);
});
