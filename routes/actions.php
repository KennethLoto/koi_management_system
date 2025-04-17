<?php

use App\Http\Controllers\ActionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('utilities/pondUtilities/actions', ActionController::class);
});
