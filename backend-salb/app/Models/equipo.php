<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;
    protected $table = 'equipos';
    protected $primaryKey = 'id';
    protected $fillable = [
         'Nombre_Equipo', 'Logo', 'Partidos_Jugados', 'Partidos_Ganados', 'Partidos_Perdidos','NumJug', 'Puntos', 'Puntos_F', 'Puntos_C', 'Dif','Cod_Categoria', 'Cod_Delegado', 'Cod_Partido'
    ];
    public function jugadores(){
        return $this->hasMany(Jugador::class,'Cod_Jugador');
    }

    public function categorias(){
        return $this->belongsTo(Categoria::class,'Cod_Categoria');
    }

    public function partidos(){
        return $this->hasMany(Partido::class,'id');
    }

    public function delegados(){
        return $this->belongsTo(Delegado::class,'id');
    }
}
