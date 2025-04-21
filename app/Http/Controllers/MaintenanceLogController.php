<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceLog;
use App\Http\Requests\StoreMaintenanceLogRequest;
use App\Http\Requests\UpdateMaintenanceLogRequest;

class MaintenanceLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreMaintenanceLogRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $maintenanceLog = MaintenanceLog::create($validated);
        return redirect()->to("/pondsInfo/maintenanceLogs/{$maintenanceLog->pond_id}")
            ->with('success', 'Maintenance log created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenanceLog $maintenanceLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaintenanceLog $maintenanceLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceLogRequest $request, MaintenanceLog $maintenanceLog)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $maintenanceLog->update($validated);
        return redirect()->to("/pondsInfo/maintenanceLogs/{$maintenanceLog->pond_id}")
            ->with('success', 'Maintenance log updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaintenanceLog $maintenanceLog)
    {
        $pondId = $maintenanceLog->pond_id;
        $maintenanceLog->delete();
        return redirect()->to("/pondsInfo/maintenanceLogs/{$pondId}")
            ->with('success', 'Maintenance log deleted successfully.');
    }
}
