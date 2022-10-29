<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablaPosicionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tabla_posicions', function (Blueprint $table) {
            $table->id();
            $table->binary('Foto_pos')->nullable();
            $table->date('Fecha');
            $table->timestamps();

            //$table->foreignId('Cod_torneo')->constrained('Torneos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Tabla_posicions');
    }
}
