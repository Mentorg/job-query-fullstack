<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function applicant(): BelongsToMany
    {
        return $this->belongsToMany(Applicant::class, 'applicant_skill');
    }
}
