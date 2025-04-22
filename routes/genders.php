<?php

use App\Http\Controllers\GenderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::resource('utilities/koiUtilities/genders', GenderController::class);
});
