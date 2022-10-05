<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;
    protected $table = 'Jugadors';
    protected $primaryKey = 'Cod_Jugador';
    protected $fillable = [
        'DNI', 'Nombre', 'Apellido','Fecha_Nacimiento', 'Foto', 'Foto_DNI', 'Peso', 'Altura', 'Asistencia', 'Faltas', 'Puntos', 'Cod_Equipo'
    ];
   /* public function equipo(){
        return $this->belongsTo(Equipo::class,'id');
    }*/
}
