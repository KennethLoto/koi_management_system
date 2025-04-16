<?php

namespace App\Http\Controllers;

use App\Models\RemovalReason;
use App\Http\Requests\StoreRemovalReasonRequest;
use App\Http\Requests\UpdateRemovalReasonRequest;

class RemovalReasonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Utilities/PondUtilities/RemovalReasons/Index', [
            'removalReasons' => RemovalReason::all(),
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
    public function store(StoreRemovalReasonRequest $request)
    {
        RemovalReason::create($request->validated());
        return redirect()->route('removalReasons.index')->with('success', 'Removal reason created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RemovalReason $removalReason)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RemovalReason $removalReason)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRemovalReasonRequest $request, RemovalReason $removalReason)
    {
        $removalReason->update($request->validated());
        return redirect()->route('removalReasons.index')->with('success', 'Removal reasons updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RemovalReason $removalReason)
    {
        $removalReason->delete();
        return redirect()->route('removalReasons.index')->with('success', 'Removal reason deleted successfully.');
    }
}
