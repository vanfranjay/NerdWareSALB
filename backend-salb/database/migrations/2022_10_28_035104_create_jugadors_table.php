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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
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
            $table->integer('Rebotes');
            $table->integer('Pases');
            $table->integer('Dobles');
            $table->integer('Triples');
            $table->timestamps();
            $table->foreignId('Cod_Equipo')
                   ->nullable()
                   ->constrained('equipos')
                   ->cascadeOnUpdate()
                   ->nullOnDelete()
                   ;
            $table->foreignId('Cod_Categoria')
                    ->nullable()
                    ->constrained('categorias')
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
