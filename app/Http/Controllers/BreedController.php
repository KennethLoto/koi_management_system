<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use App\Http\Requests\StoreBreedRequest;
use App\Http\Requests\UpdateBreedRequest;
use Inertia\Inertia;

class BreedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Utilities/KoiUtilities/Breeds/Index', [
            'breeds' => Breed::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBreedRequest $request)
    {
        Breed::create($request->validated());
        return redirect()->route('breeds.index')->with('success', 'Breed created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Breed $breed)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Breed $breed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBreedRequest $request, Breed $breed)
    {
        $breed->update($request->validated());
        return redirect()->route('breeds.index')->with('success', 'Breed updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Breed $breed)
    {
        $breed->delete();
        return redirect()->route('breeds.index')->with('success', 'Breed deleted successfully.');
    }
}
