<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JugadorController extends Controller
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
        ->join('categorias','categorias.id','=', 'jugadores.Cod_Categoria')
        ->select('jugadores.*', 'equipos.Partidos_Jugados', 'categorias.Categoria')
        ->get();
        //return Jugador::all(); //
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
       /* $request->validate([
            'DNI' => 'required|numeric' ,
            'Nombre' => 'required|string' ,
            'Apellido' => 'required|string' ,
            'Telefono' => 'required|string' ,
            'Fecha_Nacimiento' => 'required|date|date_format:Y-m-d' ,
            'Foto' => 'mimes:jpg,jpeg,png,pdf',
            'Foto_DNI'=>'mimes:jpg,jpeg,png,pdf',
            'Rol' => 'required|string' ,
            'Asistencia' => 'numeric' ,
            'Faltas' => 'numeric' ,
            'Puntos' => 'numeric' ,
            'Cod_Equipo' => 'numeric' ,
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
      /* $jugador = new Jugador();
       $jugador->DNI = $request->DNI;
       $jugador->Nombre = $request->Nombre;
       $jugador->Apellido = $request->Apellido;
       $jugador->Comprobante = $request->Comprobante;
       $jugador->Telefono = $request->Telefono;
       $jugador->Fecha_Nacimiento = $request->Fecha_Nacimiento;
       $jugador->Foto = $request->Foto;
       $jugador->Foto_DNI = $request->Foto_DNI;
       $jugador->Rol = $request->Rol;
       $jugador->Asistencia = $request->Asistencia;
       $jugador->Faltas = $request->Faltas;
       $jugador->Puntos = $request->Puntos;
       $jugador->Cod_Equipo = $request->Cod_Equipo;
       $jugador->save();
       return $jugador;*/
       $jugador = new Jugador($request->all());
        $jugador->save();
        return $jugador; 
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Jugador::find($id); //
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
        $jugador = Jugador::find($id);
        if(!is_null($jugador)){
         $jugador->update($request->all());
         return $jugador;
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
        $jugador=Jugador::find($id);
        $jugador->delete();//
    }
}
