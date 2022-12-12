<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFotosTSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fotos_ts', function (Blueprint $table) {
            $table->id();
            $table->string('Titulo');
            $table->string('Descripcion');
            $table->date('Fecha_Publicacion');
            $table->string('Foto',1000)->nullable();
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
        Schema::dropIfExists('fotos_t_s');
    }
}
