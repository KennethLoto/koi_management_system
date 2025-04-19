<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('utilities/pondUtilities/locations', LocationController::class);
});
