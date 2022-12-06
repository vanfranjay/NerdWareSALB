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
        $Fecha = $request['Fecha_Partido'];
        //return $Equipo_GP . $Equipo_PP;
        $partido = new Partido($request->all());
        
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
            $e="espicifique el equipo ganador porfavor";
            return response()->json(['ErrorMessage' => $e], 400);
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
            $e="espicifique el equipo perdedor porfavor";
            return response()->json(['ErrorMessage' => $e], 400);
         }
         $EPI = DB::table('equipos')
         ->select( 'equipos.id')
         ->where('Nombre_Equipo', $Equipo_P)
         ->value('');
        $EG = Equipo::find($EGI);
        $EP = Equipo::find($EPI);
        $comparar=  DB::table('partidos')
        ->select( 'partidos.id')
        ->where('E_Ganador', $Equipo_G)
        ->where('E_Perdedor', $Equipo_P)
        ->where('Fecha_Partido', $Fecha)
        ->value('');
        //return $comparar;
        if(!is_null($comparar)){
            $e="El resultado del partido ya se guardo anteriormente";
            return response()->json(['ErrorMessage' => $e], 400);
        }
        $partido->save();
        $aux = $EGP + $Equipo_GP; //Puntos Equipo ganador
        $aux1 = $EGPJ + 1; //Partidos jugados
        $aux2 = $EGPG + 1; //Puntos ganados
        $EG->update(['Puntos'=> $aux, 'Partidos_Jugados'=> $aux1, 'Partidos_Ganados'=>$aux2]);
        //return $EPP. ' '.$EPPG. ' ' . $EPPJ.'/n'. $EGP. ' '.$EGPG. ' ' . $EGPJ;
        $aux3 = $EPP + $Equipo_PP; //Puntos Equipo ganador
        $aux4 = $EPPJ + 1; //Partidos jugados
        $aux5 = $EPPP + 1; //Puntos perdidos
        $EP->update(['Puntos'=> $aux3, 'Partidos_Jugados'=> $aux4, 'Partidos_Perdidos'=>$aux5]);
        //return  "Se guardo los resultados"; 
        $exito="Datos guardado correctamente";
        return response()->json(['Message' => $exito], 200);//
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
