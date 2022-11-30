<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\boleta;
use App\Models\Delegado;
use Illuminate\Support\Facades\DB;
class DelBolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('delegados')
        ->join('boletas', 'delegados.id', '=', 'boletas.Cod_Delegado')
        ->select('boletas.*', 'delegados.Nombre', 'delegados.Apellido', 'delegados.Correo', 'delegados.Contador')
        ->get(); 
    }

    
    
    public function verificar($id){
   
    $delegado = Delegado::find($id);
    if(!is_null($delegado)){
     $cont = DB::table('delegados')
     -> select('delegados.Contador');
     if(!is_null($cont)){
        return $cont;
     }
    }else{
        return "No existe el delegado";
    }
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
        $delegado = new Delegado($request->all());
        $delegado->save();
        return $delegado;  //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $delegado = Delegado::find($id);
        if(!is_null($delegado)){
         /*$cont = DB::table('delegados')
         -> select('delegados.Contador');
         */
        $cont= $delegado->value('Contador');
        $cont = $delegado->Contador;
         $aux =$cont;
        $cont= $aux +1;
        $delegado->update(['Contador'=> $cont]);
        return $cont;
        }else{
            return "No existe el delegado";
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
    public function update( $id)
    {
        $delegado = Delegado::find($id);
        if(!is_null($delegado)){
         /*$cont = DB::table('delegados')
         -> select('delegados.Contador');
         */
        $cont= $delegado->value('Contador');
        $cont= $delegado->Contador;
        if($cont==0){
            return "No tiene vouchers disponibles";
         }else{
            $aux =$cont;
            $cont= $aux -1;
            $delegado->update(['Contador'=> $cont]);
            return $cont;
         }
        }else{
            return "No existe el delegado";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delegado=Delegado::find($id)->get();
        $delegado->delete();   //
    }
}
