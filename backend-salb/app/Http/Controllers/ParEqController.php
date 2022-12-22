<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Partido;
use App\Models\equipo;
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
        ->join('equipos as equiposg', 'partidos.Cod_EquipoG', '=', 'equiposg.id' )
        ->join('equipos as equiposp', 'partidos.Cod_EquipoP', '=', 'equiposp.id')
        //->select('equiposg.Nombre_Equipo')
        ->select('partidos.*', 'equiposg.Nombre_Equipo as Nombre_EquipoG', 'equiposp.Nombre_Equipo as Nombre_EquipoP')
        ->get();
    //     $equipop= DB::table('partidos')
    //     ->join('equipos', 'partidos.Cod_EquipoP', '=', 'equipos.id' )
    //    // ->join('equipos', 'partidos.Cod_EquipoP', '=', 'equipos.id')
    //     ->select('equipos.E_Ganador', 'equipos.E_Perdedor')
    //     ->get();//
       
       // return json_encode($equipog , $equipop);
       // return $equipog;
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
        $cat = $request['Cod_Categoria'];
        //return $Equipo_GP . $Equipo_PP;
        $partido = new Partido($request->all());
        if($Equipo_GP<$Equipo_PP){
            $e="Ponga el mayor puntaje al equipo ganador";
            return response()->json(['ErrorMessage' => $e], 400);
        }
        $EGP = DB::table('equipos')
        ->select( 'equipos.Puntos')
        ->where('Nombre_Equipo', $Equipo_G)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EGPF = DB::table('equipos')
        ->select( 'equipos.Puntos_F')
        ->where('Nombre_Equipo', $Equipo_G)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EGPC = DB::table('equipos')
        ->select( 'equipos.Puntos_C')
        ->where('Nombre_Equipo', $Equipo_G)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EGD = DB::table('equipos')
        ->select( 'equipos.Dif')
        ->where('Nombre_Equipo', $Equipo_G)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EGPG = DB::table('equipos')
        ->select('equipos.Partidos_Ganados')
        ->where('Nombre_Equipo', $Equipo_G)
        ->value('');
        $EGPJ = DB::table('equipos')
        ->select( 'equipos.Partidos_Jugados')
        ->where('Nombre_Equipo', $Equipo_G)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EGI = DB::table('equipos')
         ->select( 'equipos.id')
         ->where('Nombre_Equipo', $Equipo_G)
         ->where('Cod_Categoria', $cat)
         ->value('');
         $EGCC = DB::table('equipos')
         ->select( 'equipos.Cod_Categoria')
         ->where('Nombre_Equipo', $Equipo_G)
         ->where('Cod_Categoria', $cat)
         ->value('');
        //return $EGP. ' '.$EGPG. ' ' . $EGPJ;
        if(is_null($EGP)){
            $e="espicifique el equipo ganador porfavor";
            return response()->json(['ErrorMessage' => $e], 400);
        }
        $EPP = DB::table('equipos')
        ->select( 'equipos.Puntos_F')
        ->where('Nombre_Equipo', $Equipo_P)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EPPC = DB::table('equipos')
        ->select( 'equipos.Puntos_C')
        ->where('Nombre_Equipo', $Equipo_P)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EPD = DB::table('equipos')
        ->select( 'equipos.Dif')
        ->where('Nombre_Equipo', $Equipo_P)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EPPP = DB::table('equipos')
        ->select('equipos.Partidos_Perdidos')
        ->where('Nombre_Equipo', $Equipo_P)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EPPJ = DB::table('equipos')
        ->select( 'equipos.Partidos_Jugados')
        ->where('Nombre_Equipo', $Equipo_P)
        ->where('Cod_Categoria', $cat)
        ->value('');
        $EPCC = DB::table('equipos')
         ->select( 'equipos.Cod_Categoria')
         ->where('Nombre_Equipo', $Equipo_P)
         ->where('Cod_Categoria', $cat)
         ->value('');
        if(is_null($EPP)){
            $e="espicifique el equipo perdedor porfavor";
            return response()->json(['ErrorMessage' => $e], 400);
         }
         if($EGCC!=$EPCC){
            $e="Seleccione los equipos de la misma categoria";
            return response()->json(['ErrorMessage' => $e], 400);
         }
         $EPI = DB::table('equipos')
         ->select( 'equipos.id')
         ->where('Nombre_Equipo', $Equipo_P)
         ->where('Cod_Categoria', $cat)
         ->value('');
        $EG = equipo::find($EGI);
        $EP = equipo::find($EPI);
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
        $aux0 = $EGP + 3; //Puntos
        $aux = $EGPF + $Equipo_GP; //Puntos encestados Equipo ganador
        $aux1 = $EGPJ + 1; //Partidos jugados
        $aux2 = $EGPG + 1; //Partidos ganados
        $aux6 = $EGPC + $Equipo_PP; //Canastas en contra
        if($EGD<0){
            $aux7 =  $Equipo_GP - $EGD -  $Equipo_PP; // Dif de canastas negativo
        }else{
            $aux7 = $EGD + $Equipo_GP -  $Equipo_PP; //Dif de canastas  
        }
        $EG->update(['Puntos'=> $aux0,'Puntos_F'=> $aux, 'Partidos_Jugados'=> $aux1, 'Partidos_Ganados'=>$aux2,'Puntos_C'=> $aux6,'Dif'=> $aux7]);
        //return $EPP. ' '.$EPPG. ' ' . $EPPJ.'/n'. $EGP. ' '.$EGPG. ' ' . $EGPJ;
        $aux3 = $EPP + $Equipo_PP; //Puntos encestados Equipo perdedor
        $aux4 = $EPPJ + 1; //Partidos jugados
        $aux5 = $EPPP + 1; //Partidos perdidos
        $aux8 = $EPPC + $Equipo_GP; // Puntos encestados en contra
        if($EPD<0){
          $aux9 =  $Equipo_PP - $EPD - $Equipo_GP; // Dif de canastas
        }else{
            $aux9 = $EPD + $Equipo_PP - $Equipo_GP; // Dif de canastas
        }
        $EP->update(['Puntos_F'=> $aux3, 'Partidos_Jugados'=> $aux4, 'Partidos_Perdidos'=>$aux5, 'Puntos_C'=> $aux8, 'Dif'=> $aux9]);
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
        $partido = Partido::find($id);
        $partido->delete();  //
    }
}
