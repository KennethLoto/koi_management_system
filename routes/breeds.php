<?php

use App\Http\Controllers\BreedController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::resource('utilities/koiUtilities/breeds', BreedController::class);
});
