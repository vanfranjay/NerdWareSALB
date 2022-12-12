<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class JugEqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('jugadores')
        ->join('equipos', 'equipos.id', '=', 'jugadores.Cod_Equipo')
        ->join('categorias','equipos.Cod_Categoria','=', 'categorias.id')
        ->select('jugadores.*', 'equipos.Nombre_Equipo', 'categorias.Categoria')
        ->get();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $jugadores = Equipo::find($id);
        if(!is_null($jugadores)){
         /*$cont = DB::table('delegados')
         -> select('delegados.Contador');
         */
        $cont= $jugadores->value('NumJug');
         $cont = $jugadores->NumJug;
        
        if($cont>11){
            $e="Maximo de jugadores alcanzado";
            return response()->json(['ErrorMessage' => $e], 400);
        }else{
        $aux =$cont;
        $cont= $aux + 1;
        $jugadores->update(['NumJug'=> $cont]);
        return $cont;
        }
        }else{
            $e="No existe el equipo";
            return response()->json(['ErrorMessage' => $e], 400);
        }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
