<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model 
{
    use HasFactory;
    protected $table = 'Personas';
    protected $primarykey = 'id';
    protected $fillable = [
        'Nombre', 'Apellido', 'Rol', 'Imagen', 'Fecha_nacimiento', 'Telefono', 'Email', 'Password', 'Password_confirmation',
    ];

    // public function jugador()
    // {
    //     return $this->hasOne(Jugador::class,'Cod_Jugador');
    // }
}
