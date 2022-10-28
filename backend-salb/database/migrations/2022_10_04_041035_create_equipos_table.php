<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquiposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre')->unique();
            $table->binary('Logo')->nullable();
            $table->string('Categoria'); //puede cambiarse a un entero
            $table->integer('Partidos_Jugados');
            $table->integer('Partidos_Ganados');
            $table->integer('Partidos_Perdidos');
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
        Schema::dropIfExists('equipos');
    }
}
