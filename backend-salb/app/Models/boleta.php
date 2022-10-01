<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class boleta extends Model
{
    use HasFactory;
    protected $table = 'boletas';
    protected $primaryKey = 'Cod_Boleta';
    protected $fillable = [
        'N_Transaccion', 'Monto', 'Fecha_Registro','Comprobante', 'Estado', 
    ];
    
}
