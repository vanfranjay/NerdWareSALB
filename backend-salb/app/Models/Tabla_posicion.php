<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tabla_posicion extends Model
{
    use HasFactory;
    protected $table = 'Tabla_posicions';
    protected $primarykey = 'id';
    protected $fillable = [
        'Fecha', 'Foto_pos',
        //'Cod_torneo',
    ];

    // public function tabla_posisiones()
    // {
    //     return $this->hasMany(Tabla_posicion::class,'id');
    // }  
    // para la tabla Torneo

    // public function torneo()
    // {
    //     return $this->belongsTo(Torneo::class,'Cod_torneo');
    // }
}
