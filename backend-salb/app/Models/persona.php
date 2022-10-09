<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class persona extends Model
{
    use HasFactory;
    protected $table = 'personas';
    protected $primarykey = 'id';
    protected $fillable = [
        'nombre', 'apellido', 'rol', 'imagen', 'fecha_nacimiento', 'telefono', 'email', 'password',
    ];

    /*public function persona()
    {
        return $this->hasOne(persona::class);
    }*/
}
