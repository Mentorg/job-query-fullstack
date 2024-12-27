<?php

namespace Database\Seeders;

use App\Models\Recruiter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class RecruiterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/recruiter.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Recruiter::create(
                [
                    'id' => $item['id'],
                    'expertise' => $item['expertise'],
                    'description' => $item['description'],
                    'user_id' => $item['user_id'],
                    'company_id' => $item['company_id'],
                ]
            );
        }
    }
}
