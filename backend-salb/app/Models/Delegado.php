<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delegado extends Model
{
    use HasFactory;
    protected $table = 'delegados';
    protected $primaryKey = 'id';
    protected $fillable = [
        'Nombre', 'Apellido', 'Telefono','Contraseña', 'Contraseña_confirmed', 'Correo', 'Foto_Perfil', 'Foto_DNI', 'Habilitado', 
    ];
    public function boletas(){
        return $this->hasMany(boleta::class,'Cod_Boleta');
    }
}
