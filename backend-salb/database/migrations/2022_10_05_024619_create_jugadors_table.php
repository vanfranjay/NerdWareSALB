<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJugadorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jugadors', function (Blueprint $table) {
            $table->id('Cod_Jugador');
            $table->integer('DNI');
            $table->string('Nombre');
            $table->string('Apellido');
            $table->date('Fecha_Nacimiento');
            $table->binary('Foto')->nullable();
            $table->binary('Foto_DNI')->nullable();
            $table->string('Rol');
            $table->integer('Asistencia');
            $table->integer('Faltas');
            $table->integer('Puntos');
            $table->timestamps();
            $table->foreignId('Cod_Equipo')
                   ->nullable()
                   ->constrained('Equipos')
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
        Schema::dropIfExists('jugadors');
    }
}