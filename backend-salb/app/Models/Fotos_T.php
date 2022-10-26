<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fotos_T extends Model
{
    use HasFactory;
    protected $table = 'fotos_ts';
    protected $primarykey = 'id';
    protected $fillable = [
        'Titulo', 'Descripcion', 'Fecha_Publicacion', 'Foto',
    ];

    /*public function tabla()
    {
        return $this->hasOne(tabla::class,'id');
    }*/
}
