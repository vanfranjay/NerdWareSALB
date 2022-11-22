<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNoticiasTSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('noticias_ts', function (Blueprint $table) {
            $table->id('Cod_Noticia');
            $table->date('Fecha')->nullable();
            $table->string('Imagen',80000)->nullable();
            $table->string('Titulo');
            $table->string('Descripcion');
            $table->string('Link');
            $table->foreignId('Cod_Torneo')
                   ->nullable()
                   ->constrained('torneos')
                   ->cascadeOnUpdate()
                   ->nullOnDelete()
                   ;
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
        Schema::dropIfExists('noticias__t_s');
    }
}
