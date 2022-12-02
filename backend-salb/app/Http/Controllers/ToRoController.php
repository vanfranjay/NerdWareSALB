<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
class ToRoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $año = date("Y");
       $mes = date("m");
       $dia = date("d");
       $hoy = date("Y-m-d");
       $dia1 = $dia + 2;
       if($dia1<10){
          $dia1= "0". $dia1;
       }
       $aux = $año ."-". $mes ."-". $dia1;
      // $hoy1 = Date("$año", "$mes", "$dia1");
       $hoy1= Date($aux);
      // return $hoy1; 
        return DB::table('torneos')
        ->join('rol_partidos', 'torneos.id', '=', 'rol_partidos.Cod_Torneo')
        ->select('rol_partidos.*', 'torneos.Nombre_Torneo')
        ->whereBetween('Fecha', [$hoy, $hoy1])
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
