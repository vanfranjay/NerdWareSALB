<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Partido;
use App\Models\Equipo;
class ParEqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('partidos')
        ->join('equipos', 'partidos.id', '=', 'equipos.Cod_Partido')
        ->select('partidos.*', 'equipos.*')
        ->get();  //
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
        $Equipo_G = $request['E_Ganador']; 
        $Equipo_GP = $request['Puntos_Ganador'];
        $Equipo_P = $request['E_Perdedor'];
        $Equipo_PP = $request['Puntos_Perdedor']; 
        //return $Equipo_GP . $Equipo_PP;
        $partido = new Partido($request->all());
        $partido->save();
        $EGP = DB::table('equipos')
        ->select( 'equipos.Puntos')
        ->where('Nombre_Equipo', $Equipo_G)
        ->value('');
        $EGPG = DB::table('equipos')
        ->select('equipos.Partidos_Ganados')
        ->where('Nombre_Equipo', $Equipo_G)
        ->value('');
        $EGPJ = DB::table('equipos')
        ->select( 'equipos.Partidos_Jugados')
        ->where('Nombre_Equipo', $Equipo_G)
        ->value('');
        $EGI = DB::table('equipos')
         ->select( 'equipos.id')
         ->where('Nombre_Equipo', $Equipo_G)
         ->value('');
        //return $EGP. ' '.$EGPG. ' ' . $EGPJ;
        if(is_null($EGP)){
           return 'espicifique el equipo ganador porfavor';
        }
        $EPP = DB::table('equipos')
        ->select( 'equipos.Puntos')
        ->where('Nombre_Equipo', $Equipo_P)
        ->value('');
        $EPPP = DB::table('equipos')
        ->select('equipos.Partidos_Perdidos')
        ->where('Nombre_Equipo', $Equipo_P)
        ->value('');
        $EPPJ = DB::table('equipos')
        ->select( 'equipos.Partidos_Jugados')
        ->where('Nombre_Equipo', $Equipo_P)
        ->value('');
        if(is_null($EPP)){
            return 'espicifique el equipo perdedor porfavor';
         }
         $EPI = DB::table('equipos')
         ->select( 'equipos.id')
         ->where('Nombre_Equipo', $Equipo_P)
         ->value('');
        $EG = Equipo::find($EGI);
        $EP = Equipo::find($EPI);
        $aux = $EGP + $Equipo_GP; //Puntos Equipo ganador
        $aux1 = $EGPJ + 1; //Partidos jugados
        $aux2 = $EGPG + 1; //Puntos ganados
        $EG->update(['Puntos'=> $aux, 'Partidos_Jugados'=> $aux1, 'Partidos_Ganados'=>$aux2]);
        //return $EPP. ' '.$EPPG. ' ' . $EPPJ.'/n'. $EGP. ' '.$EGPG. ' ' . $EGPJ;
        $aux3 = $EPP + $Equipo_PP; //Puntos Equipo ganador
        $aux4 = $EPPJ + 1; //Partidos jugados
        $aux5 = $EPPP + 1; //Puntos perdidos
        $EP->update(['Puntos'=> $aux3, 'Partidos_Jugados'=> $aux4, 'Partidos_Perdidos'=>$aux5]);
        return  "Se guardo los resultados"; //
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
