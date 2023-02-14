<?php

namespace Database\Factories;
use App\Models\Subject;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

     protected $model = Task::class;

    public function definition()
    {
        return [
            'subject_id' => Subject::all()->random(1)[0]->id,
            'due' => $this->faker->optional()->dateTimeBetween($startDate = 'now', $endDate = '+2 week'),
            'time' => $this->faker->optional()->time(),
            'text' => $this->faker->word(),
            'done' => $this->faker->boolean(),
            'mtg' => $this->faker->boolean(),
            'priority' => $this->faker->boolean(),
        ];
    }
}
