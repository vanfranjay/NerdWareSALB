<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolPartidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Rol_partidos', function (Blueprint $table) {
            $table->id();
            $table->binary('Foto_part')->nullable();
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
        Schema::dropIfExists('Rol_partidos');
    }
}
