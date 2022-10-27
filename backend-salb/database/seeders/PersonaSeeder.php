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
        $persona1->Nombre = "Juan Pablo";
        $persona1->Apellido ="Rivera Torrez";
        $persona1->Rol= '0';
        $persona1->Imagen= null;
        $persona1->Fecha_nacimiento ="1991-03-09";
        $persona1->Telefono ="61234567";
        $persona1->Email ="rivera_torrez@gmail.com";
        $persona1->Password ="rivera123";
        $persona1->Password_confirmation ="rivera123";
        $persona1->save();

        $persona2 = new Persona();
        $persona2->Nombre = "Maria Jose";
        $persona2->Apellido ="Terrazas Fierro";
        $persona2->Rol= '0';
        $persona2->Imagen= null;
        $persona2->Fecha_nacimiento ="1987-09-23";
        $persona2->Telefono ="71234567";
        $persona2->Email ="terrazaz_fierro@gmail.com";
        $persona2->Password ="terrazas123";
        $persona2->Password_confirmation ="terrazas123";
        $persona2->save();

        $persona3 = new Persona();
        $persona3->Nombre = "Sergi";
        $persona3->Apellido ="Perez Angulo";
        $persona3->Rol= '0';
        $persona3->Imagen= null;
        $persona3->Fecha_nacimiento ="1999-01-01";
        $persona3->Telefono ="72345678";
        $persona3->Email ="perez_angulo@gmail.com";
        $persona3->Password ="perez123";
        $persona3->Password_confirmation ="perez123";
        $persona3->save();

        $persona4 = new Persona();
        $persona4->Nombre = "Mario Juan";
        $persona4->Apellido ="Gonzalo Lopez";
        $persona4->Rol= '1';
        $persona4->Imagen= null;
        $persona4->Fecha_nacimiento ="1977-09-23";
        $persona4->Telefono ="73456789";
        $persona4->Email ="gonzalo_lopez@gmail.com";
        $persona4->Password ="gonzalo123";
        $persona4->Password_confirmation ="gonzalo123";
        $persona4->save();
        
        $persona5 = new Persona();
        $persona5->Nombre = "Luna Esperenza";
        $persona5->Apellido ="Rivera Escalona";
        $persona5->Rol= '1';
        $persona5->Imagen= null;
        $persona5->Fecha_nacimiento ="1996-11-13";
        $persona5->Telefono ="74567890";
        $persona5->Email ="rivera_escalona@gmail.com";
        $persona5->Password ="rivera123";
        $persona5->Password_confirmation ="rivera123";
        $persona5->save();
        
        $persona6 = new Persona();
        $persona6->Nombre = "Andrea";
        $persona6->Apellido ="Fuentes Espinoza";
        $persona6->Rol= '1';
        $persona6->Imagen= null;
        $persona6->Fecha_nacimiento ="1991-07-18";
        $persona6->Telefono ="70987654";
        $persona6->Email ="fuentes_espinoza@gmail.com";
        $persona6->Password ="fuentes123";
        $persona6->Password_confirmation ="fuentes123";
        $persona6->save();

        Persona::factory(50)->create();
    }

}
