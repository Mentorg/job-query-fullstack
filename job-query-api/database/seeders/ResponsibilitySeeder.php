<?php

namespace Database\Seeders;

use App\Models\Responsibility;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ResponsibilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/responsibility.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Responsibility::create(
                [
                    'id' => $item['id'],
                    'description' => $item['description'],
                    'job_listings_id' => $item['job_listings_id'],
                ]
            );
        }
    }
}
