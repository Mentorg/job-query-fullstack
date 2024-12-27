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

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }
}
