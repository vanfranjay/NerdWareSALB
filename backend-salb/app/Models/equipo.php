<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class equipo extends Model
{
    use HasFactory;
    protected $table = 'equipos';
    protected $primaryKey = 'id';
    protected $fillable = [
         'Nombre', 'Logo', 'Partidos_Jugados', 'Partidos_Ganados', 'Partidos_Perdidos'
    ];
    public function jugadores(){
        return $this->hasMany(Jugador::class,'Cod_Jugador');
    }
}