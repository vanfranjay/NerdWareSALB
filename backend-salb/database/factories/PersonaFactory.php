<?php

namespace Database\Factories;

use App\Models\persona;
use Illuminate\Database\Eloquent\Factories\Factory;

class personaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = persona::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name, 
            'apellido' => $this->faker->lastname, 
            'rol' => $this->faker->numberBetween($int5=0, $int6=2),
            'imagen' => null,
            'fecha_nacimiento' => $this->faker->date, 
            'telefono' => $this->faker->numberBetween($int1=60000000, $int2=79999999),
            'email' => $this->faker->unique()->safeEmail, 
            'password' => $this->faker->numberBetween($int3=1000000000, $int4=9999999999),
        ];
    }
}
