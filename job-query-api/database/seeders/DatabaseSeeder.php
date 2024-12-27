<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CurrencySeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(SkillSeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CompanySeeder::class);
        $this->call(PaymentSeeder::class);
        $this->call(RecruiterSeeder::class);
        $this->call(NotificationSettingSeeder::class);
        $this->call(BillingSettingSeeder::class);
        $this->call(ApplicantSeeder::class);
        $this->call(EducationSeeder::class);
        $this->call(ExperienceSeeder::class);
        $this->call(ApplicantSkillSeeder::class);
        $this->call(ApplicantLanguageSeeder::class);
        $this->call(CompanyLocationSeeder::class);
        $this->call(JobSeeder::class);
        $this->call(ResponsibilitySeeder::class);
        $this->call(QualificationSeeder::class);
        $this->call(ApplicationSeeder::class);
        $this->call(JobListingsLocation::class);
    }
}
