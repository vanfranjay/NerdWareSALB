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
       /* $request->validate([
            'Nombre' => 'required | unique:Equipo | ',
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
        */
        $equipo = new Equipo($request->all());

        try {
             $equipo->save();
        } catch (\Exception $e) {
            return response()->json(['errorCode' => $e->errorInfo[0], 'errorMessage' => $e->errorInfo[2] ], 400);
        }
        return response()->json($equipo);
    }

    public function show($id)
    {
        return Equipo::find($id); //busca un equipo especifico y lo devuelve
    }

    public function update(Request $request, $id)
    {
        $equipo = Equipo::find($id);
        if(!is_null($equipo)){
            $equipo->update($request->all());
            return $equipo;
        }
    }

    public function destroy($id)
    {
        $equipo = Equipo::find($id);
        $equipo->delete();
    }

}
