<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use App\Http\Requests\StoreUserRoleRequest;
use App\Http\Requests\UpdateUserRoleRequest;

class UserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRoles = UserRole::all();
        return inertia('Utilities/UserUtilities/UserRoles/Index', [
            'userRoles' => $userRoles,
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
    public function store(StoreUserRoleRequest $request)
    {
        UserRole::create($request->validated());
        return redirect()->route('userRoles.index')->with('success', 'User role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserRole $userRole)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserRole $userRole)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRoleRequest $request, UserRole $userRole)
    {
        $userRole->update($request->validated());
        return redirect()->route('userRoles.index')->with('success', 'User role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserRole $userRole)
    {
        $userRole->delete();
        return redirect()->route('userRoles.index')->with('success', 'User role deleted successfully.');
    }
}
