<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;
    protected $table = 'jugadores';
    protected $primaryKey = 'id';
    protected $fillable = [
        'DNI', 'Nombre', 'Apellido','Fecha_Nacimiento', 'Foto', 'Foto_DNI', 'Rol', 'Asistencia', 'Faltas', 'Puntos','Rebotes', 'Pases', 'Dobles', 'Triples', 'Cod_Equipo', 
    ];

   public function equipo(){
        return $this->belongsTo(Equipo::class,'Cod_Equipo');
    }

    /*public function categoria(){
        return $this->belongsTo(Categoria::class,'Cod_Categoria');
    }*/
}
