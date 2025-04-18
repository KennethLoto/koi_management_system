<?php

use App\Http\Controllers\SubActionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('utilities/pondUtilities/subActions', SubActionController::class);
});
