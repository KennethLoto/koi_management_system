<?php

namespace App\Http\Controllers;

use App\Models\WaterLog;
use App\Http\Requests\StoreWaterLogRequest;
use App\Http\Requests\UpdateWaterLogRequest;
use Inertia\Inertia;

class WaterLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PondsInfo/WaterLogs/Index', [
            'waterLogs' => WaterLog::all(),
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
    public function store(StoreWaterLogRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $waterLog = WaterLog::create($validated);
        return redirect()->to("/pondsInfo/waterLogs/{$waterLog->pond_id}")
            ->with('success', 'Water log created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WaterLog $waterLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WaterLog $waterLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWaterLogRequest $request, WaterLog $waterLog)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $waterLog->update($validated);
        return redirect()->to("/pondsInfo/waterLogs/{$waterLog->pond_id}")
            ->with('success', 'Water log updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WaterLog $waterLog)
    {
        $pondId = $waterLog->pond_id;
        $waterLog->delete();
        return redirect()->to("/pondsInfo/waterLogs/{$pondId}")
            ->with('success', 'Water log deleted successfully.');
    }
}
