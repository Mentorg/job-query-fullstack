<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get('database/data/payment.json');

        $data = json_decode($json, true);

        foreach ($data as $item) {
            Payment::create(
                [
                    'id' => $item['id'],
                    'card_type' => $item['card_type'],
                    'card_number' => $item['card_number'],
                    'expiration_date' => $item['expiration_date'],
                    'cvv' => $item['cvv'],
                    'is_active' => $item['is_active'],
                    'created_at' => $item['created_at'],
                    'updated_at' => $item['updated_at'],
                    'company_id' => $item['company_id'],
                ]
            );
        }
    }
}
