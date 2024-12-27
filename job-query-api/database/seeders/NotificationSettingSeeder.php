<?php

namespace Database\Seeders;

use App\Models\NotificationSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class NotificationSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/notification_setting.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            NotificationSetting::create([
                'id' => $item['id'],
                'new_candidate' => $item['new_candidate'],
                'communication_updates' => $item['communication_updates'],
                'hiring_stage' => $item['hiring_stage'],
                'resume_status' => $item['resume_status'],
                'events_update' => $item['events_update'],
                'recruitment_dates' => $item['recruitment_dates'],
                'security_alerts' => $item['security_alerts'],
                'renewal_dates' => $item['renewal_dates'],
                'recruiter_id' => $item['recruiter_id'],
            ]);
        }
    }
}
