<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/education.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Education::create(
                [
                    'id' => $item['id'],
                    'department' => $item['department'],
                    'degree' => $item['degree'],
                    'university' => $item['university'],
                    'honors' => $item['honors'],
                    'gpa' => $item['gpa'],
                    'date_start' => $item['date_start'],
                    'date_end' => $item['date_end'],
                    'applicant_id' => $item['applicant_id'],
                ]
            );
        }
    }
}
