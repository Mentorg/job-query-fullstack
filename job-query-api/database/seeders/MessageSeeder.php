<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('conversations')->insert([
            ['created_at' => '2024-08-03 12:00:00'],
        ]);

        DB::table('conversation_participants')->insert([
            ['conversation_id' => 1, 'user_id' => 0],
            ['conversation_id' => 1, 'user_id' => 1],
        ]);

        DB::table('messages')->insert([
            [
                'conversation_id' => 1,
                'sender_id' => 1,
                'subject' => 'Greetings',
                'content' => 'Hello, how can I help you?',
                'created_at' => '2024-08-04 09:15:00'
            ],
        ]);

        DB::table('attachments')->insert([
            [
                'message_id' => 1,
                'file_path' => '/path/to/file.pdf',
                'created_at' => '2024-08-05 14:20:00'
            ],
        ]);
    }
}
