<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class boleta extends Model
{
    use HasFactory;
    protected $table = 'Boletas';
    protected $primaryKey = 'Cod_Boleta';
    protected $fillable = [
        'N_Transaccion', 'Monto', 'Fecha_Registro','Comprobante', 'Estado','Cod_Delegado', 
    ];
    public function delegados(){
        return $this->belongsTo(Delegado::class,'id');
    }
}
