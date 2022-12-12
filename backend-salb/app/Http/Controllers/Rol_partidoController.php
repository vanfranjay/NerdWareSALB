<?php

namespace App\Http\Controllers;

use App\Models\Rol_partido;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isNull;

class Rol_partidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Rol_partido::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rolpartido = new Rol_partido($request->all());
        $equipoA= $rolpartido->value('EquipoA');
        $equipoA = $rolpartido->EquipoA;
        $equipoB= $rolpartido->value('EquipoB');
        $equipoB = $rolpartido->EquipoB;
        $fecha= $rolpartido->value('Fecha');
        $fecha = $rolpartido->Fecha;
        $cancha = $rolpartido->value('Cancha');
        $cancha = $rolpartido->Cancha;
        $hora= $rolpartido->value('Hora');
        $hora= $rolpartido->Hora;
        $ho = date_create($hora);
       $h = $ho->format('H');
       $m = $ho->format('i');
      
       if($h>23){
       $h = "01"; 
       }else{
        $h = $h +1;
        if($h<10){
         $h= 0 . $h;
        }
       }
       $ho1= date_create($h . $m);
       $ho2 =$ho1->format('H:i');
       $ho3 = date($h . $m);
       //return gettype($ho3);
        $buscar = DB::table('rol_partidos')
        ->select( 'rol_partidos.*')
        ->where('EquipoA', $equipoA  )
       // ->where( 'EquipoB' , $equipoB)
        ->where('Fecha' , $fecha)
        ->value('');
        $buscar1 = DB::table('rol_partidos')
        ->select( 'rol_partidos.*')
       // ->where('EquipoA', $equipoA  )
        ->where( 'EquipoB' , $equipoB)
        ->where('Fecha' , $fecha)
        ->value('');
        $buscar2 = DB::table('rol_partidos')
        ->select( 'rol_partidos.*')
       // ->where('EquipoA', $equipoA  )
        ->where('Fecha' , $fecha)
        ->where('Cancha', $cancha)
        ->whereBetween('Hora', [$ho, $ho2])
        ->value('');
        //return $buscar;
        if(!is_null($buscar)){
            $e="El equipo A seleccionado ya tiene un partido programado en la fecha seleccionada";
       return response()->json(['errorMessage' => $e ], 400);      
        }
        if(!is_null($buscar1)){
            $e="El equipo B seleccionado ya tiene un partido programado en la fecha seleccionada";
       return response()->json(['errorMessage' => $e ], 400);      
        }
        if(!is_null($buscar2)){
            $e="La cancha seleccionada ya esta ocupada en la hora solicitada";
       return response()->json(['errorMessage' => $e ], 400);      
        }
        $rolpartido->save();
            return $rolpartido;
       //return "Ya se registro";
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Rol_partido::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rolpartido = Rol_partido::findOrfail($id);
        $rolpartido->update($request->all());
        return $rolpartido;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Rol_partido::find($id)->delete();
        return "Se borro exitosamente";
    }
}
