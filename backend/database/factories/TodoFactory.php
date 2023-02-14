<?php

namespace Database\Factories;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Todo::class;

    public function definition()
    {
        return [
            'user_id' => User::all()->random(1)[0]->id,
            'title' => $this->faker->name(),
            'share' => $this->faker->boolean(),
            'password' => \Hash::make('password'),
        ];
    }
}
