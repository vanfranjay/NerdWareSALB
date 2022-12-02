<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->string('E_Ganador');
            $table->string('E_Perdedor');
            $table->integer('Puntos_Ganador');
            $table->integer('Puntos_Perdedor');
            $table->date('Fecha_Partido');
            $table->string('Hora_Inicio');
            $table->string('Hora_Final');
            $table->string('Lugar');
            $table->string('Campeonato');
            $table->string('Categoria');
            $table->string('Entrenador_G');
            $table->string('Entrenador_P');
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
        Schema::dropIfExists('partidos');
    }
}
