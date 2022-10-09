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
        'nombre', 'apellido', 'rol', 'imagen', 'fecha_nacimiento', 'telefono', 'email', 'password', 'password_confirmation',
    ];

    /*public function tabla()
    {
        return $this->hasOne(tabla::class,'id');
    }*/
}
