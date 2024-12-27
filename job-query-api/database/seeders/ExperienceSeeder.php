<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/experience.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Experience::create(
                [
                    'id' => $item['id'],
                    'company' => $item['company'],
                    'title' => $item['title'],
                    'date_start' => $item['date_start'],
                    'date_end' => $item['date_end'],
                    'applicant_id' => $item['applicant_id'],
                    'location_id' => $item['location_id'],
                ]
            );
        }
    }
}
