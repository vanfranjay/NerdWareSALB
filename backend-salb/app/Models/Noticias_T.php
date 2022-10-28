<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticias_T extends Model
{
    use HasFactory;
    protected $table = 'Noticias_T';
    protected $primaryKey = 'Cod_Noticia';
    protected $fillable = [
        'Fecha','Imagen','Titulo','Descripcion','Link',
    ];
    
}
