<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;
    protected $table = 'equipos';
    protected $primaryKey = 'Cod_Equipo';
    protected $fillable = [
         'Nombre', 'Logo', 'Partidos_Jugados', 'Partidos_Ganados', 'Partidos_Perdidos','Categoria_id',
    ];
    public function jugadores(){
        return $this->hasMany(Jugador::class,'Cod_Jugador');
    }

    public function categorias(){
        return $this->belongsTo(Categoria::class,'Cod_Categoria');
    }

    public function partidos(){
        return $this->hasMany(Partido::class,'Cod_Partido');
    }
}
