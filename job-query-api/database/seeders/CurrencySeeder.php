<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/currency.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Currency::create([
                'id' => $item['id'],
                'symbol' => $item['symbol'],
                'name' => $item['name'],
                'symbol_native' => $item['symbol_native'],
                'decimal_digits' => $item['decimal_digits'],
                'rounding' => $item['rounding'],
                'code' => $item['code'],
                'name_plural' => $item['name_plural'],
            ]);
        }
    }
}
