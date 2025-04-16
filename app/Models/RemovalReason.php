<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemovalReason extends Model
{
    /** @use HasFactory<\Database\Factories\RemovalReasonFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'removal_reason'
    ];
}
