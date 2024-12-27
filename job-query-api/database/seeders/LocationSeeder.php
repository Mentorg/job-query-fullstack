<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/location.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Location::create([
                'id' => $item['id'],
                'city' => $item['city'],
                'country' => $item['country'],
                'code' => $item['code']
            ]);
        }
    }
}
