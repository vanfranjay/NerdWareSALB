<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipo;

class EquipoController extends Controller
{
    public function index()
    {
        return Equipo::all();
    }

    public function store(Request $request)
    {
        $equipo = new Equipo($request->all());
        $equipo->save();
        return $equipo;//para almacenar
    }

    public function show($id)
    {
        return Equipo::find($id)->get(); //busca un equipo especifico y lo devuelve
    }

    public function update(Request $request, $id)
    {
        $equipo = Equipo::find($id)->get();
        if(!is_null($equipo)){
            $equipo->update($request->all());
            return $equipo;
        }
    }

    public function destroy($id)
    {
        $equipo = Equipo::find($id)->get();
        $equipo->delete();
    }
}
