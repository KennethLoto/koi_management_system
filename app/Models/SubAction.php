<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubAction extends Model
{
    /** @use HasFactory<\Database\Factories\SubActionFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'sub_action',
        'action_id'
    ];
}
