<?php

use App\Http\Controllers\UserRoleController;
use App\Models\UserRole;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('utilities/userUtilities/userRoles', UserRoleController::class);
});
