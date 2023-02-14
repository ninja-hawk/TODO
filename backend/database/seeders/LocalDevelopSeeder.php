<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LocalDevelopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Todo::factory(25)->create();
        \App\Models\Subject::factory(100)->create();
        \App\Models\Task::factory(1000)->create();
    }
}
