<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $casts = [
        'is_annual' => 'boolean',
    ];

    protected $fillable = [
        'description',
        'price',
        'is_annual',
        'subscription_id'
    ];

    public function feature(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'feature_subscription');
    }
}
