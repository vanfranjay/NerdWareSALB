<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneo;
use Illuminate\Support\Facades\DB;
class TorneoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Torneo::all(); //
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
        $ac=0;
        $solo = DB::table('torneos')
        ->select('torneos.id')
        ->first()
        ->value('torneos.id');
        if(is_null($solo)){
           $ac= 1;
        }
        $torneo = new Torneo($request->all());
        $FIT = $request['Fecha_Ini_Torneo'];
        $FFT= DB::table('torneos')
        ->select('torneos.Fecha_Fin_Torneo')
        ->where('Activo',  1)
        ->value('torneos.Fecha_Fin_Torneo');
        $aux= DB::table('torneos')
       // ->join('rol_partidos', 'torneos.id', '=', 'rol_partidos.Cod_Torneo')
        ->select('torneos.id')
        ->whereBetween('Fecha_Fin_Torneo', [$FIT,$FFT ])
        ->value('torneos.id');
        if(is_null($aux)){
            $torneo->save();
           // $torneo->update('Activo', $ac);
            return $torneo;
        }
        $e="La fecha Inicio de Torneo, conincide con el toreno actual";
        return response()->json(['Message' => $e], 400);
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
        return Torneo::find($id);  //
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
        $torneo = Torneo::find($id);
        if(!is_null($torneo)){
         $torneo->update($request->all());
         return $torneo;
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
        $torneo=Torneo::find($id);
        $torneo->delete();  //
    }
}
