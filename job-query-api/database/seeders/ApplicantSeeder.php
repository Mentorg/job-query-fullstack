<?php

namespace Database\Seeders;

use App\Models\Applicant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/applicant.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Applicant::create(
                [
                    'id' => $item['id'],
                    'user_id' => $item['user_id'],
                ]
            );
        }
    }
}
