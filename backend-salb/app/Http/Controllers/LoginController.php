<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
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
        $Correo = $request["Correo"];
              $Contraseña = $request["Contraseña"];
              $usuario =  DB::table('delegados')
              //->select('delegados.id')
              ->where('Correo', $Correo)
              ->value('id');
              if(is_null($usuario)){
                $e="Porfavor verifique el correo";
              return response()->json(['errorMessage' => $e ], 400); 
              }else{
               $c =  DB::table('delegados')
              //->select('delegados.id')
              ->where('id', $usuario)
              ->value('Contraseña');
              if($c==$Contraseña){
                $exito="Bienvenido al sistema";
             // return response()->json(['errorMessage' => $exito ], 200); 
                 return $c =  DB::table('delegados')
                 ->where('id', $usuario)
                 ->get(); 
            }else{
                $e="Contraseña no valida, verifique e intentelo de nuevo";
                return response()->json(['errorMessage' => $e ], 400);
              }
              }
              return $usuario; //
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
