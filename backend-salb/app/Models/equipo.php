<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;
    protected $table = 'Equipos';
    protected $primaryKey = 'Id';
    protected $fillable = [
         'Nombre', 'Logo', 'Categoria','Partidos_Jugados', 'Partidos_Ganados', 'Partidos_Perdidos',
    ];
    public function jugadores(){
        return $this->hasMany(Jugador::class,'Cod_Jugador');
    }
}