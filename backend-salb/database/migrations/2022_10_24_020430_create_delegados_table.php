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
            $table->string('CI')->unique();
            $table->string('Nombre');
            $table->string('Apellido');
            $table->string('Telefono');
            $table->string('Contraseña');
            $table->string('Contraseña_confirmed');
            $table->string('Correo');
            $table->string('Foto_Perfil',1000)->nullable();
            $table->string('Foto_DNI', 1000)->nullable();
            $table->integer('Habilitado')->default(0); //0 que no puede incribir a su equipo
            $table->integer('Contador')->default(0);
            $table->timestamps();
            $table->foreignId('Cod_Torneo')
                   ->nullable()
                   ->constrained('torneos')
                   ->cascadeOnUpdate()
                   ->nullOnDelete()
                   ;
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
