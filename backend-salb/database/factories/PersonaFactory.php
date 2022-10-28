<?php

namespace Database\Factories;

use App\Models\Persona;
use Illuminate\Database\Eloquent\Factories\Factory;
use Stringable;

class personaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Persona::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'Nombre' => $this->faker->name, 
            'Apellido' => $this->faker->lastname, 
            'Rol' => $this->faker->numberBetween($int5=0, $int6=2),
            'Imagen' => null,
            'Fecha_nacimiento' => $this->faker->date, 
            'Telefono' => $this->faker->numberBetween($int1=60000000, $int2=79999999),
            'Email' => $this->faker->unique()->safeEmail, 
            'Password'=> "password",
            'Password_confirmation' => "password",
        ];
    }
}
