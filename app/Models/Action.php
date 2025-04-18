<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    /** @use HasFactory<\Database\Factories\ActionFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'action'
    ];

    public function subActions()
    {
        return $this->hasMany(SubAction::class);
    }
}
