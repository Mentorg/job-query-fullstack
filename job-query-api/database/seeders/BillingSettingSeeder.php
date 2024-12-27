<?php

namespace Database\Seeders;

use App\Models\BillingSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class BillingSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/billing_setting.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            BillingSetting::create([
                'id' => $item['id'],
                'email' => $item['email'],
                'is_autorenew' => $item['is_autorenew'],
                'created_at' => $item['created_at'],
                'updated_at' => $item['updated_at'],
                'company_id' => $item['company_id'],
            ]);
        }
    }
}
