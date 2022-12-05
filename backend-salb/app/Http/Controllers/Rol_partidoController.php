<?php

namespace App\Http\Controllers;

use App\Models\Rol_partido;
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
        $buscar = DB::table('rol_partidos')
        ->select( 'rol_partidos.*')
        ->where('EquipoA', $equipoA  )
        ->where( 'EquipoB' , $equipoB)
        ->where('Fecha' , $fecha)
        ->value('');
        //return $buscar;
        if(is_null($buscar)){
            $rolpartido->save();
            return $rolpartido;
        }
       //return "Ya se registro";
       $e="Ya se registro el partido";
       return response()->json(['errorMessage' => $e ], 400);
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
