<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PondUtilitiesController extends Controller
{
    public function index()
    {
        return Inertia::render('Utilities/PondsUtilities/Index');
    }
}
