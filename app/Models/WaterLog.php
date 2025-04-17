<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterLog extends Model
{
    /** @use HasFactory<\Database\Factories\WaterLogFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'ph_level',
        'temperature',
        'ammonia_level',
        'notes',
        'pond_id',
        'user_id',
    ];

    public function pond()
    {
        return $this->belongsTo(Pond::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
