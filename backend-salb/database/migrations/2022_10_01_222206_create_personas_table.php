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
        Schema::create('personas', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre');
            $table->string('Apellido');
            $table->string('Rol');
            $table->binary('Imagen')->nullable();
            $table->date('Fecha_nacimiento');
            $table->integer('Telefono');
            $table->string('Email')->unique();
            $table->string('Password');
            $table->string('Password_confirmation');
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
        Schema::dropIfExists('personas');
    }
}

