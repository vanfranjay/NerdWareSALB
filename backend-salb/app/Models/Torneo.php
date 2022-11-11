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
        'Invitacion','Nombre_Torneo','Lugar_Evento','Fecha_Ini_Torneo','Fecha_Fin_Torneo','Rama','Caracter','Responsable','Telefono', 'Categoria', 'Cod_Categoria',
    ];

    public function fotos(){
        return $this->hasMany(Fotos_T::class,'id');
    }
    public function Noticias(){
        return $this->hasMany(Noticias_T::class,'id');
    }
    public function Rol(){
        return $this->hasMany(Rol_partido::class,'id');
    }
    public function Tabla(){
        return $this->hasMany(Tabla_posicion::class,'id');
    }
    public function categorias(){
        return $this->belongsTo(Categoria::class,'Cod_Categoria');
    }
}
