<?php

namespace App\Http\Controllers;

use App\Models\Pond;
use App\Http\Requests\StorePondRequest;
use App\Http\Requests\UpdatePondRequest;
use App\Models\Action;
use App\Models\Location;
use Inertia\Inertia;

class PondController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Ponds/Index', [
            'ponds' => Pond::with('location')->get(),
            'locations' => Location::all(),
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
    public function store(StorePondRequest $request)
    {
        Pond::create(array_merge($request->validated(), [
            'pond_id' => $this->generatePondId()
        ]));

        return redirect()->route('ponds.index')->with('success', 'Pond created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pond $pond)
    {
        $pond->load('location');

        $latestWaterLog = $pond->waterLogs()->with('user')->latest()->first();
        $latestMaintenanceLog = $pond->maintenanceLogs()->with('user')->latest()->first();

        return Inertia::render('Ponds/Show', [
            'pond' => array_merge($pond->toArray(), [
                'latest_water_log' => $latestWaterLog,
                'latest_maintenance_log' => $latestMaintenanceLog,
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pond $pond)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePondRequest $request, Pond $pond)
    {
        $pond->update($request->validated());
        return redirect()->route('ponds.index')->with('success', 'Pond updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pond $pond)
    {
        $pond->delete();
        return redirect()->route('ponds.index')->with('success', 'Pond deleted successfully!');
    }

    private function generatePondId(): string
    {
        $today = now()->format('Y-m-d');
        $lastSeq = (int) substr(Pond::withTrashed()
            ->where('pond_id', 'like', "PND-{$today}-%")
            ->latest('pond_id')->value('pond_id') ?? '', -4);
        return "PND-{$today}-" . str_pad($lastSeq > 0 ? $lastSeq + 1 : 1, 4, '0', STR_PAD_LEFT);
    }

    public function waterlogs(Pond $pond)
    {
        $waterLogs = $pond->waterLogs()->with('user')->latest()->get();

        return Inertia::render('PondsInfo/WaterLogs/Index', [
            'pond' => $pond,
            'waterLogs' => $waterLogs,
        ]);
    }

    public function maintenancelogs(Pond $pond)
    {
        $maintenanceLogs = $pond->maintenanceLogs()->with(['action', 'sub_action', 'user'])->latest()->get();
        $actions = Action::with('subActions')->get(); // ✅ This line fetches actions and sub-actions

        return Inertia::render('PondsInfo/MaintenanceLogs/Index', [
            'pond' => $pond,
            'maintenanceLogs' => $maintenanceLogs,
            'actions' => $actions,
        ]);
    }
}
