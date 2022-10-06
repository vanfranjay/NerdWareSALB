<?php

namespace Database\Seeders;
use App\Models\persona;
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
        $persona1 = new persona();
        $persona1->nombre = "Juan Pablo";
        $persona1->apellido ="Rivera Torrez";
        $persona1->rol= '0';
        $persona1->imagen= null;
        $persona1->fecha_nacimiento ="23/03/1991";
        $persona1->telefono ="61234567";
        $persona1->email ="rivera_torrez@gmail.com";
        $persona1->password ="rivera123";
        $persona1->save();

        $persona2 = new persona();
        $persona2->nombre = "Maria Jose";
        $persona2->apellido ="Terrazas Fierro";
        $persona2->rol= '0';
        $persona2->imagen= null;
        $persona2->fecha_nacimiento ="15/06/1987";
        $persona2->telefono ="71234567";
        $persona2->email ="terrazaz_fierro@gmail.com";
        $persona2->password ="terrazas123";
        $persona2->save();

        $persona3 = new persona();
        $persona3->nombre = "Sergi";
        $persona3->apellido ="Perez Angulo";
        $persona3->rol= '0';
        $persona3->imagen= null;
        $persona3->fecha_nacimiento ="09/09/1999";
        $persona3->telefono ="72345678";
        $persona3->email ="perez_angulo@gmail.com";
        $persona3->password ="perez123";
        $persona3->save();

        $persona4 = new persona();
        $persona4->nombre = "Mario Juan";
        $persona4->apellido ="Gonzalo Lopez";
        $persona4->rol= '1';
        $persona4->imagen= null;
        $persona4->fecha_nacimiento ="09/09/1979";
        $persona4->telefono ="73456789";
        $persona4->email ="gonzalo_lopez@gmail.com";
        $persona4->password ="gonzalo123";
        $persona4->save();
        
        $persona5 = new persona();
        $persona5->nombre = "Luna Esperenza";
        $persona5->apellido ="Rivera Escalona";
        $persona5->rol= '1';
        $persona5->imagen= null;
        $persona5->fecha_nacimiento ="09/09/1996";
        $persona5->telefono ="74567890";
        $persona5->email ="rivera_escalona@gmail.com";
        $persona5->password ="rivera123";
        $persona5->save();
        
        $persona6 = new persona();
        $persona6->nombre = "Andrea";
        $persona6->apellido ="Fuentes Espinoza";
        $persona6->rol= '1';
        $persona6->imagen= null;
        $persona6->fecha_nacimiento ="23/05/2001";
        $persona6->telefono ="70987654";
        $persona6->email ="fuentes_espinoza@gmail.com";
        $persona6->password ="fuentes123";
        $persona6->save();

        persona::factory(50)->create();
    }

}
