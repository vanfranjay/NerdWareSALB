<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    use HasFactory;
    protected $table = 'torneos';
    protected $primarykey = 'id';
    protected $fillable = [
        'Campeon', 'Subcampeon', 'Fecha_Ini_Convocatoria', 'Fecha_Fin_Convocatoria','Fecha_Ini_Preinscripcion', 'Fecha_Fin_Preinscripcion', 'Fecha_Ini_Inscripcion', 'Fecha_Fin_Inscripcion', 'MontoPreinscripcion', 'MontoInscripcion',
    ];

    /*public function tabla()
    {
        return $this->hasOne(tabla::class,'id');
    }*/
}
