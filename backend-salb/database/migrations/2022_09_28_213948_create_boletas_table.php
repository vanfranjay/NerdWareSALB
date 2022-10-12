<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoletasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Boletas', function (Blueprint $table) {
            $table->id('Cod_Boleta');
            $table->string('N_Transaccion')->unique();
            $table->decimal('Monto');
            $table->date('Fecha_Registro');
            $table->binary('Comprobante')->nullable();
            $table->integer('Estado')->default(0); //0 pendiente, 1 aprobado, 2 rechazado
            $table->timestamps();
            $table->foreignId('Cod_Delegado')
                   ->nullable()
                   ->constrained('Delegados')
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
        Schema::dropIfExists('boletas');
    }
}