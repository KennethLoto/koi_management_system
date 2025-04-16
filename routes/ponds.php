<?php

use App\Http\Controllers\PondController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ponds', PondController::class);
});
