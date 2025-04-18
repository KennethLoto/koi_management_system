<?php

namespace App\Http\Controllers;

use App\Models\SubAction;
use App\Http\Requests\StoreSubActionRequest;
use App\Http\Requests\UpdateSubActionRequest;

class SubActionController extends Controller
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
    public function store(StoreSubActionRequest $request)
    {
        $subAction = SubAction::create($request->validated());
        return redirect()->to("/utilities/pondUtilities/actions/{$subAction->action_id}")->with('success', 'Sub Action created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubAction $subAction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubAction $subAction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubActionRequest $request, SubAction $subAction)
    {
        $subAction->update($request->validated());
        return redirect()->to("/utilities/pondUtilities/actions/{$subAction->action_id}")->with('success', 'Sub Action updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubAction $subAction)
    {
        $subAction->delete();
        return redirect()->to("/utilities/pondUtilities/actions/{$subAction->action_id}")->with('success', 'Sub Action deleted successfully.');
    }
}
