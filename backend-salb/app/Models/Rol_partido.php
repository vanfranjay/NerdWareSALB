<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol_partido extends Model
{
    use HasFactory;
    protected $table = 'rol_partidos';
    protected $primarykey = 'id';
    protected $fillable = [
        'Fecha', 'Hora', 'EquipoA', 'EquipoB','Lugar', 'Cancha','Cod_Torneo', 
        // 'Cod_torneo',
    ];
    
    // public function rol_partidos()
    // {
    //     return $this->hasMany(Rol_partido::class,'id');
    // }  
    // para la tabla Torneo

    public function torneos(){
        return $this->belongsTo(Torneo::class,'id');
    }
}
