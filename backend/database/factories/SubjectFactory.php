<?php

namespace Database\Factories;
use App\Models\Subject;
use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = Subject::class;

    public function definition()
    {
        return [
            'todo_id' => Todo::all()->random(1)[0]->id,
            'name' => $this->faker->company(),
        ];
    }
}
