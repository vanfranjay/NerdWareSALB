<?php

namespace Database\Seeders;
use App\Models\Persona;
use Illuminate\Database\Seeder;

class PersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persona1 = new Persona();
        $persona1->nombre = "Juan Pablo";
        $persona1->apellido ="Rivera Torrez";
        $persona1->rol= '0';
        $persona1->imagen= null;
        $persona1->fecha_nacimiento ="1991-03-09";
        $persona1->telefono ="61234567";
        $persona1->email ="rivera_torrez@gmail.com";
        $persona1->password ="rivera123";
        $persona1->password_confirmation ="rivera123";
        $persona1->save();

        $persona2 = new Persona();
        $persona2->nombre = "Maria Jose";
        $persona2->apellido ="Terrazas Fierro";
        $persona2->rol= '0';
        $persona2->imagen= null;
        $persona2->fecha_nacimiento ="1987-09-23";
        $persona2->telefono ="71234567";
        $persona2->email ="terrazaz_fierro@gmail.com";
        $persona2->password ="terrazas123";
        $persona2->password_confirmation ="terrazas123";
        $persona2->save();

        $persona3 = new Persona();
        $persona3->nombre = "Sergi";
        $persona3->apellido ="Perez Angulo";
        $persona3->rol= '0';
        $persona3->imagen= null;
        $persona3->fecha_nacimiento ="1999-01-01";
        $persona3->telefono ="72345678";
        $persona3->email ="perez_angulo@gmail.com";
        $persona3->password ="perez123";
        $persona3->password_confirmation ="perez123";
        $persona3->save();

        $persona4 = new Persona();
        $persona4->nombre = "Mario Juan";
        $persona4->apellido ="Gonzalo Lopez";
        $persona4->rol= '1';
        $persona4->imagen= null;
        $persona4->fecha_nacimiento ="1977-09-23";
        $persona4->telefono ="73456789";
        $persona4->email ="gonzalo_lopez@gmail.com";
        $persona4->password ="gonzalo123";
        $persona4->password_confirmation ="gonzalo123";
        $persona4->save();
        
        $persona5 = new Persona();
        $persona5->nombre = "Luna Esperenza";
        $persona5->apellido ="Rivera Escalona";
        $persona5->rol= '1';
        $persona5->imagen= null;
        $persona5->fecha_nacimiento ="1996-11-13";
        $persona5->telefono ="74567890";
        $persona5->email ="rivera_escalona@gmail.com";
        $persona5->password ="rivera123";
        $persona5->password_confirmation ="rivera123";
        $persona5->save();
        
        $persona6 = new Persona();
        $persona6->nombre = "Andrea";
        $persona6->apellido ="Fuentes Espinoza";
        $persona6->rol= '1';
        $persona6->imagen= null;
        $persona6->fecha_nacimiento ="1991-07-18";
        $persona6->telefono ="70987654";
        $persona6->email ="fuentes_espinoza@gmail.com";
        $persona6->password ="fuentes123";
        $persona6->password_confirmation ="fuentes123";
        $persona6->save();

        Persona::factory(50)->create();
    }

}
