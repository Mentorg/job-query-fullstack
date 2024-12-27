<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationSetting extends Model
{
    use HasFactory;
    protected $table = 'notification_setting';
    public $timestamps = false;

    protected $fillable = [
        'new_candidate',
        'communication_updates',
        'hiring_stage',
        'resume_status',
        'events_update',
        'recruitment_dates',
        'security_alerts',
        'renewal_dates',
    ];

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class);
    }
}
