<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/skill.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Skill::create(
                [
                    'id' => $item['id'],
                    'description' => $item['description'],
                ]
            );
        }
    }
}
