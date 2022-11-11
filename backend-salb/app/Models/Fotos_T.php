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
        'Titulo', 'Descripcion', 'Fecha_Publicacion', 'Foto', 'Cod_Torneo',
    ];

    public function torneos(){
        return $this->belongsTo(Torneo::class,'id');
    }
}
