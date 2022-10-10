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
        $request->validate([
            'Nombre' => 'required | unique:Equipos | ',
            'Logo' => 'file|size:5000'
            
        ],
        [
            'Nombre.required' => 'El nombre es necesario',
            'Logo.file' => 'La imagen supera el tamaño establecido',
        ]
        );
        $equipo = new Equipo();
        $equipo->Nombre = $request->Nombre;
        $equipo->Logo = $request->Logo;
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
