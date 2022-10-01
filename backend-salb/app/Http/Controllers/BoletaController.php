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
       $boleta = new boleta($request->all());
       $boleta->save();
       return $boleta; //para alamacenar 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return boleta::find($id)->get();  // busca un boletoa especifica y lo devuelve
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
       $boleta = boleta::find($id)->get();
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
     $boleta=boleta::find($id)->get();
     $boleta->delete();   //
    }
}
