<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Torneo;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ToTaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('torneos')
        ->join('tabla_posicions', 'torneos.id', '=', 'tabla_posicions.Cod_Torneo')
        ->select('tabla_posicions.*', 'torneos.*')
        ->get();   //
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
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     
       /*
        $cat = Categoria::find($id);
        if(!is_null($cat)){
            return DB::table('equipos')
            ->join('categorias', 'categorias.id', '=', 'equipos.Cod_Categoria')
            ->select('equipos.Nombre_Equipo', 'equipos.Logo', 'equipos.Partidos_Jugados', 'equipos.Partidos_Ganados', 'equipos.Partidos_Perdidos' , 'equipos.Puntos')
            ->where('categorias.Categoria', $id)
            ->orderBy('Puntos' , 'asc')
            ->get();   
        }else{
            return "No existe la categoria escogida";
        } 
       */  
      return DB::table('equipos')
            ->join('categorias', 'categorias.id', '=', 'equipos.Cod_Categoria')
            ->select('equipos.Nombre_Equipo', 'equipos.Logo', 'equipos.Partidos_Jugados', 'equipos.Partidos_Ganados', 'equipos.Partidos_Perdidos' ,'equipos.Puntos_F', 'equipos.Puntos_C', 'equipos.Dif', 'equipos.Puntos')
            ->where('categorias.Categoria', $id)
            ->orderBy('Puntos' , 'desc')
            ->orderBy('Dif', 'desc')
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
