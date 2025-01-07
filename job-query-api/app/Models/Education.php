<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{
    use HasFactory;
    protected $table = 'educations';
    public $timestamps = false;
    protected $guarded = [];

    public function getDateStartAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d.m.Y');
    }

    public function getDateEndAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d.m.Y');
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
