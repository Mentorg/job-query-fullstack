<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';
    protected $casts = [
        'company_id' => 'integer',
    ];
    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($job) {
            $job->slug = $job->generateUniqueSlug($job->title);
        });

        static::updating(function ($job) {
            $job->slug = $job->generateUniqueSlug($job->title);
        });
    }

    private function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;

        $count = 1;
        while (self::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function responsibilities(): HasMany
    {
        return $this->hasMany(Responsibility::class, 'job_listings_id');
    }

    public function qualifications(): HasMany
    {
        return $this->hasMany(Qualification::class, 'job_listings_id');
    }

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class, 'job_listings_location', 'job_listings_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'job_listings_id');
    }
}
