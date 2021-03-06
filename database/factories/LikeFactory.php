<?php

namespace Database\Factories;

use App\Models\Like;
use App\Models\User;
use App\Models\Journey;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Like::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::pluck('id')->toArray();
        $journeys = Journey::pluck('id')->toArray();
        return [
            'user_id' => $this->faker->randomElement($users), // or simply create new by using User::factory(),
            'journey_id' => $this->faker->randomElement($journeys) // or simply create new by using Journey::factory()
        ];
    }
}
