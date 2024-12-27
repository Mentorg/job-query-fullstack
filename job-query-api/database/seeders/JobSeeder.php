<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/job.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Job::create(
                [
                    'id' => $item['id'],
                    'title' => $item['title'],
                    'is_fulltime' => $item['is_fulltime'],
                    'work_preference' => $item['work_preference'],
                    'seniority' => $item['seniority'],
                    'experience' => $item['experience'],
                    'salary_from' => $item['salary_from'],
                    'salary_to' => $item['salary_to'],
                    'is_salary_monthly' => $item['is_salary_monthly'],
                    'applicants' => $item['applicants'],
                    'status' => $item['status'],
                    'has_visa_sponsorship' => $item['has_visa_sponsorship'],
                    'education' => $item['education'],
                    'slug' => $item['slug'],
                    'position_overview' => $item['position_overview'],
                    'created_at' => $item['created_at'],
                    'updated_at' => $item['updated_at'],
                    'deadline' => $item['deadline'],
                    'recruiter_id' => $item['recruiter_id'],
                    'company_id' => $item['company_id']
                ]
            );
        }
    }
}
