<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Delegado;
use Illuminate\Support\Facades\Validator;
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
        $delegado = new Delegado($request->all());     
        $validator = Validator::make($request->all(), [
            '' => 'required|unique:CI' ,
        ],
        [
            //'N_Transaccion.required' => 'El campo es necesario',
            'CI.unique' => 'EL CI ya fue regustrada',
        ]);

        try {
            $delegado->save();
        } catch (\Exception $e) {
            return response()->json(['errorCode' => $e->errorInfo[0], 'errorMessage' => $e->errorInfo[2] ], 400);
        }
        return response()->json($delegado);
     /*
       $delegado = new Delegado($request->all());
        $delegado->save();
        return $delegado;  //
       */ 
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
