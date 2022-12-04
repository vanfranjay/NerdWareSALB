<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class Estadisticas1Controller extends Controller
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
        ->join('categorias', 'categorias.id', '=', 'equipos.Cod_Categoria')
        ->select('jugadores.Nombre', 'jugadores.Apellido', 'jugadores.Faltas', 'jugadores.Foto', 'equipos.Nombre_Equipo', 'equipos.Logo', "categorias.Categoria")
        //->where('categorias.Categoria', $id)
        ->orderBy('Faltas' , 'desc')
        ->limit(5)
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
        return DB::table('jugadores')
        ->join('equipos', 'equipos.id', '=', 'jugadores.Cod_Equipo')
        ->join('categorias', 'categorias.id', '=', 'equipos.Cod_Categoria')
        ->select('jugadores.Nombre', 'jugadores.Apellido', 'jugadores.Faltas', 'jugadores.Foto', 'equipos.Nombre_Equipo', 'equipos.Logo', "categorias.Categoria")
        ->where('categorias.Categoria', $id)
        ->orderBy('Faltas' , 'desc')
        ->limit(5)
        ->get();    //
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
