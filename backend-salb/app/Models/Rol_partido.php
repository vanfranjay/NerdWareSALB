<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol_partido extends Model
{
    use HasFactory;
    protected $table = 'Rol_partidos';
    protected $primarykey = 'id';
    protected $fillable = [
        'Fecha', 'Foto_part',
        // 'Cod_torneo',
    ];
    
    // public function rol_partidos()
    // {
    //     return $this->hasMany(Rol_partido::class,'id');
    // }  
    // para la tabla Torneo

    // public function torneo()
    // {
    //     return $this->belongsTo(Torneo::class,'Cod_torneo');
    // }
}
