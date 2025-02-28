<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;

class Company extends Model
{
    use HasFactory, Notifiable;
    protected $guarded = [];

    public function billingSetting(): HasOne
    {
        return $this->hasOne(BillingSetting::class);
    }

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function invoice(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function recruiter(): HasMany
    {
        return $this->hasMany(Recruiter::class);
    }

    public function job(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class, 'company_location');
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(CompanySubscription::class);
    }
}
