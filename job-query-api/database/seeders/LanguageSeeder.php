<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/language.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Language::create(
                [
                    'id' => $item['id'],
                    'description' => $item['description'],
                ]
            );
        }
    }
}
