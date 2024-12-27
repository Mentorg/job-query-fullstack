<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory;

    // protected $table = 'location';
    public $timestamps = false;

    public function user(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function experience(): HasMany
    {
        return $this->hasMany(Experience::class);
    }

    public function company(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'company_location');
    }

    public function job(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'job_listings_location');
    }
}
