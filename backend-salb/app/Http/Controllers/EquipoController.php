<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\equipo;

class EquipoController extends Controller
{
    public function index()
    {
        return equipo::all();
    }

    public function store(Request $request)
    {
        $equipo = new equipo($request->all());
        $equipo->save();
        return $equipo;//para almacenar
    }

    public function show($id)
    {
        return equipo::find($id)->get(); //busca un equipo especifico y lo devuelve
    }

    public function update(Request $request, $id)
    {
        $equipo = equipo::find($id)->get();
        if(!is_null($equipo)){
            $equipo->update($request->all());
            return $equipo;
        }
    }

    public function destroy($id)
    {
        $equipo = equipo::find($id)->get();
        $equipo->delete();
    }
}
