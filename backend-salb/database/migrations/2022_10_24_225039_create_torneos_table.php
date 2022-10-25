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
            $table->date('Fecha_Ini_Convocatoria');
            $table->date('Fecha_Fin_Convocatoria');
            $table->date('Fecha_Ini_Preinscripcion');
            $table->date('Fecha_Fin_Preinscripcion');
            $table->decimal('Monto');
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
