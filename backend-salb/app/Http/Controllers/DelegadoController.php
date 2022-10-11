<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Delegado;
class DelegadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Delegado::all();   //
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
      /*  $request->validate([
            'Nombre' => 'required|string ' ,
            'Apellido' => 'required|string' ,
            'Telefono' => 'required|numeric' ,
            //'Contraseña' => 'required|confirmed' ,
           // 'Contraseña_confirmed' => 'required' ,
            'Correo' => 'email:rfc,dns' ,
            //'Foto_Perfil'=>'mimes:jpg,jpeg,png',
            //'Foto_DNI'=>'mimes:jpg,jpeg,png,pdf',
        ],
       [
        //Nombre.required' => 'El campo es necesario',
        //Nombre.string' => 'El campo solo admite caracteres',
        //'Apellido.required' => 'El campo es necesario',
        //'Apellido.string' => 'El campo solo admite caracteres',
        //'Contraseña.required' => 'El campo es necesario',
        //Contraseña.confirmed' => 'Confirme la contraseña',
        //'Contraseña_Confirmation.required' => 'La contraseña no es la misma',
        //'Correo.email' => 'Correo invalido',
        //'Foto_Perfil.mimes' => 'El campo solo admite extensiones jpg, jpeg y png' ,
        //'Foto_DNI.mimes' => 'El campo solo admite extensiones pdf, jpg, jpeg y png',
    ]);
       $delegado = new Delegado();
       $delegado->Nombre = $request->Nombre;
       $delegado->Apellido = $request->Apellido;
       $delegado->Contraseña = $request->Contraseña;
       $delegado->Telefono = $request->Telefono;
       $delegado->Contraseña_confirmed = $request->Contraseña_confirmed;
       $delegado->Correo = $request->Correo;
       $delegado->Foto_Perfil = $request->Foto_Perfil;
       $delegado->Foto_DNI = $request->Foto_DNI;
       $delegado->save();
       return $delegado; */
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
        return Delegado::find($id);  //
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
        $delegado = Delegado::find($id);
       if(!is_null($delegado)){
        $delegado->update($request->all());
        return $delegado;
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
        $delegado=Delegado::find($id);
        $delegado->delete();   //
    }
}
