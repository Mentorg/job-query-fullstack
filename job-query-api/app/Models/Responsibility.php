<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Responsibility extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_listings_id');
    }
}
