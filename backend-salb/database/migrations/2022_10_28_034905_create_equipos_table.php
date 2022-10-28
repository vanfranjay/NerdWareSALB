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
            $table->id('Cod_Equipo');
            $table->string('Nombre')->unique();
            $table->binary('Logo')->nullable();
           // $table->string('Categoria'); //puede cambiarse a un entero
            $table->integer('Partidos_Jugados');
            $table->integer('Partidos_Ganados');
            $table->integer('Partidos_Perdidos');
            $table->timestamps();
            $table->foreign('Categoria_id')
                   ->references('Cod_Categoria')
                   ->on('categorias')
                   ->nullable()
                   //->constrained('categorias')
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
        Schema::dropIfExists('equipos');
        Schema::table('equipos',function (Blueprint $table) {
            $table->dropForeign('equipos_Categoria_id_foreign');

            $table->dropColumn('Categoria_id');
        });
    }
}
