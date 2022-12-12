<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Equipo;

class JugadorController extends Controller
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
        //return Jugador::all(); //
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
        $jugador = new Jugador($request->all());  
        $id = $jugador->value('Cod_Equipo');
        $id = $jugador->Cod_Equipo;   
        $validator = Validator::make($request->all(), [
            '' => 'required|unique:DNI' ,
        ],
        [
            'DNI.unique' => 'EL CI ya fue regustrada',
        ]);

        try {
           
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
        $jugador->save();
        //return $cont;
        }
        }else{
            $e="No existe el equipo";
            return response()->json(['ErrorMessage' => $e], 400);
        }
        } catch (\Exception $e) {
            return response()->json(['errorCode' => $e->errorInfo[0], 'errorMessage' => $e->errorInfo[2] ], 400);
        }
        return response()->json($jugador);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Jugador::find($id); //
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
        $jugador = Jugador::find($id);
        if(!is_null($jugador)){
         $jugador->update($request->all());
         return $jugador;
        }  //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $jugador=Jugador::find($id);
        $jugador->delete();//
    }
}
