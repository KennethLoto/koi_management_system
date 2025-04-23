<?php

namespace App\Http\Controllers;

use App\Models\HealthStatus;
use App\Http\Requests\StoreHealthStatusRequest;
use App\Http\Requests\UpdateHealthStatusRequest;
use Inertia\Inertia;

class HealthStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Utilities/KoiUtilities/HealthStatuses/Index', [
            'healthStatuses' => HealthStatus::all(),
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
    public function store(StoreHealthStatusRequest $request)
    {
        HealthStatus::create($request->validated());
        return redirect()->route('healthStatuses.index')->with('success', 'Health status created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HealthStatus $healthStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HealthStatus $healthStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHealthStatusRequest $request, HealthStatus $healthStatus)
    {
        $healthStatus->update($request->validated());
        return redirect()->route('healthStatuses.index')->with('success', 'Health status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HealthStatus $healthStatus)
    {
        $healthStatus->delete();
        return redirect()->route('healthStatuses.index')->with('success', 'Health status deleted successfully.');
    }
}
