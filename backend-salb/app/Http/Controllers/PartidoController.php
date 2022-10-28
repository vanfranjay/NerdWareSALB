<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partido;

class PartidoController extends Controller
{
    public function index()
    {
        return Partido::all();
    }

    public function store(Request $request)
    {
        $partido = new Partido($request->all());
        $partido->save();
        return $partido;
    }

    public function show($id)
    {
        return Partido::find($id);//busca uno especifico y lo devuelve
    }

    public function update(Request $request,$id)
    {
        $partido = Partido::find($id);
        if(!is_null($partido)){
            $partido->update($request->all());
            return $partido;
        }
    }

    public function destroy($id)
    {
        $partido = Partido::find($id);
        $partido->delete();
    }
    
}
