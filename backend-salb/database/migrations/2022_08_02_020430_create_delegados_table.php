<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDelegadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delegados', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre');
            $table->string('Apellido');
            $table->string('Telefono');
            $table->string('Contraseña');
            $table->string('Contraseña_confirmed');
            $table->string('Correo');
            $table->binary('Foto_Perfil')->nullable();
            $table->binary('Foto_DNI')->nullable();
            $table->integer('Habilitado')->default(0); //0 que no puede incribir a su equipo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('delegados');
    }
}
