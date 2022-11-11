<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTorneosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('torneos', function (Blueprint $table) {
            $table->id();
            $table->string('Campeon');
            $table->string('Subcampeon');
            $table->date('Fecha_Ini_Convocatoria')->default('2022-09-14');
            $table->date('Fecha_Fin_Convocatoria')->default('2022-10-14');
            $table->date('Fecha_Ini_Preinscripcion')->default('2022-09-14');
            $table->date('Fecha_Fin_Preinscripcion')->default('2022-10-30');
            $table->date('Fecha_Ini_Inscripcion')->default('2022-09-14');
            $table->date('Fecha_Fin_Inscripcion')->default('2022-09-14');
            $table->decimal('MontoPreinscripcion')->default('200');
            $table->decimal('MontoInscripcion')->default('250');
            $table->string('Invitacion');
            $table->string('Nombre_Torneo');
            $table->string('Lugar_Evento');
            $table->string('Fecha_Ini_Torneo');
            $table->string('Fecha_Fin_Torneo');
            $table->string('Rama');
            $table->string('Caracter');
            $table->string('Responsable');
            $table->string('Telefono');
            $table->string('Categoria');
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
        Schema::dropIfExists('torneos');
    }
}
