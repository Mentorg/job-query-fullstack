<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillingSetting extends Model
{
    use HasFactory;
    protected $table = 'billing_setting';

    protected $fillable = [
        'email',
        'is_autorenew'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
