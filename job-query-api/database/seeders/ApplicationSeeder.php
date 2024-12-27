<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/application.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Application::create(
                [
                    'id' => $item['id'],
                    'status' => $item['status'],
                    'resume' => $item['resume'],
                    'note' => $item['note'],
                    'created_at' => $item['created_at'],
                    'updated_at' => $item['updated_at'],
                    'applicant_id' => $item['applicant_id'],
                    'job_listings_id' => $item['job_listings_id']
                ]
            );
        }
    }
}
