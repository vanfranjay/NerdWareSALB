<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categorias';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Categoria', 'Cod_Torneo'
    ];
    public function equipo(){
        return $this->hasMany(Equipo::class,'id');
    }
    
    /*public function jugador(){
        return $this->hasMany(Jugador::class,'Cod_Jugador');
    }*/
    public function torneo(){
        return $this->hasMany(Torneo::class,'Cod_Torneo');
    }
}
