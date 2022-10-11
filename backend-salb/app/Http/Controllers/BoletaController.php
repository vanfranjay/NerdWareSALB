<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\boleta;

class BoletaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return boleta::all(); // muestra todos las boletas
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // no lo utilzamos, porque no utilizamos blade
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $request->validate([
           'N_Transaccion' => 'required | unique:Boletas,N_Transaccion' ,
            'Monto' => 'required|numeric' ,
            'Fecha_Registro' => 'required|date|date_format:Y-m-d|before_or_equal:2022-10-20' ,
            //'Comprobante' => 'required | mimes:jpg, jpeg, png, pdf' ,
            //'Estado' => 'numeric' ,
            'Cod_Delegado' => 'numeric' ,
       ],
       [
        //'N_Transaccion.required' => 'El campo es necesario',
        'N_Transaccion.unique' => 'EL numero de transaccion ya fue registrado, no trate de engañarnos -_-',
        //'Monto.required' => 'El campo es necesario',
        //'Monto.numeric' => 'El campo solo admite numeros',
        //'Fecha_Registro.required' => 'El campo es necesario',
        //'Fecha_Registro.date' => 'El campo solo admite fechas',
        'Fecha_Registro.date_format' => 'Formato YYYY-MM-DD',
        'Fecha_Registro.befor_or_equal' => 'La fecha disponible caduco, comuniquese con el administrador',
        //'Comprobante.required' => 'El campo es necesario' ,
        //'Comprobante.mimes' => 'El campo solo admite extensiones pdf, jpg, jpeg y png',
        //'Estado.required' => 'El campo es necesario',
        'Cod_Delegado.numeric' => 'Solo admite numeros',
    ]); /*
       $boleta = new boleta();
       $boleta->N_Transaccion = $request->N_Transaccion;
       $boleta->Monto = $request->Monto;
       $boleta->Fecha_Registro = $request->Fecha_Registro;
       $boleta->Comprobante = $request->Comprobante;
       $boleta->Estado = $request->Estado;
       $boleta->Cod_Delegado = $request->Cod_Delegado;
       $boleta->save();
       return $boleta; //para alamacenar 
      */
        /*if ($request->fails()) {
        return response()->json(['error' => $request->messages()], 400);
        }*/
      $boleta = new boleta($request->all());
      $boleta->save();
      return $boleta;}
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return boleta::find($id);  // busca un boletoa especifica y lo devuelve
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
       $boleta = boleta::find($id);
       if(!is_null($boleta)){
        $boleta->update($request->all());
        return $boleta;
       } //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
     $boleta=boleta::find($id);
     $boleta->delete();   //
    }
}
