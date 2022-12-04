<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\For_;

class JugEq1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $aux = "";
        For( $i = 0; $i <12; $i++){
            if (is_null($request[$i])){
               // return "Se guardo todo"; 
            } else{
              $id = $request[$i]["id"];
              $faltas = $request[$i]["faltas"];
              $puntos = $request[$i]["puntos"];
              $jugador = Jugador::find($id);
              $f= $jugador->value('Faltas');
              $f = $jugador->Faltas;
              $fa= $faltas + $f;
              $p= $jugador->value('Puntos');
              $p = $jugador->Puntos;
              $pu= $puntos + $p;
              $jugador->update(['Puntos'=> $pu, 'Faltas'=> $fa]);
              $aux= $aux . $jugador; 
            }
            
        }
        
       return  "Se actualizo la tabla jugador con exito"; //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table('jugadores')
        ->join('equipos', 'equipos.id', '=', 'jugadores.Cod_Equipo')
        ->join('categorias','categorias.id','=', 'jugadores.Cod_Categoria')
        ->select('jugadores.*', 'equipos.Nombre_Equipo', 'categorias.Categoria')
        ->where('jugadores.Cod_Equipo',$id)
        ->get();
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
    public function update(Request $request)
    {
        /*$jugador = Jugador::find($id);
        if(!is_null($jugador)){
         $jugador->update($request->all());
         return $jugador;
        }  */
        $aux =new Jugador($request->all());
        $aux->save();
       return $aux; 
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
