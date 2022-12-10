<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;
    protected $table = 'partidos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'E_Ganador', 'E_Perdedor','Puntos_Ganador','Puntos_Perdedor','Fecha_Partido', 'Hora_Inicio','Hora_Final', 'Lugar', 'Cancha', 'Cod_EquipoG', 'Cod_EquipoP',
    ];

    public function equipo(){
        return $this->hasMany(Equipo::class,'Cod_EquipoG', 'Cod_EquipoP');
        //return $this->belongsToMany(Equipo::class,'Cod_EquipoG', 'Cod_EquipoP');
    }
}
