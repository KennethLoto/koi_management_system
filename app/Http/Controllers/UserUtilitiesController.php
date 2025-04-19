<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserUtilitiesController extends Controller
{
    public function index()
    {
        return Inertia::render('Utilities/UserUtilities/Index');
    }
}
