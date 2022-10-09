<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Personas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->integer('rol');
            $table->binary('imagen')->nullable();
            $table->date('fecha_nacimiento');
            $table->integer('telefono');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('password_confirmation');
            $table->timestamps(); 

            //$table->string('imagen');
            //$table->unsignedBigInteger('id_per');
            //$table->foreign('id_per')->references('id')->on('personas');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Personas');
    }
}

