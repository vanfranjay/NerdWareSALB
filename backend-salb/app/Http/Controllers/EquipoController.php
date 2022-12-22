<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\equipo;
use Illuminate\Support\Facades\DB;

class EquipoController extends Controller
{
    public function index()
    {
        //return Equipo::all();
        return DB::table('equipos')
        ->join('categorias','categorias.id','=', 'equipos.Cod_Categoria')
        ->select( 'equipos.*', 'categorias.Categoria')
        ->get();
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
        $equipo = new equipo($request->all());
        $nombre= $equipo->value('Nombre_Equipo');
        $nombre = $equipo->Nombre_Equipo;
        $categoria= $equipo->value('Cod_Categoria');
        $categoria = $equipo->Cod_Categoria;
        $n = DB::table('equipos')
        ->select('equipos.id') 
        ->where('Nombre_Equipo',$nombre)
        ->where('Cod_Categoria',$categoria)
        ->value('equipos.id');
        if(!is_null($n)){
            $e="El equipo ya fue registrado en la misma categoria seleccionada";
            return response()->json(['ErrorMessage' => $e], 400);
        }
        try {
             $equipo->save();
        } catch (\Exception $e) {
            return response()->json(['errorCode' => $e->errorInfo[0], 'errorMessage' => $e->errorInfo[2] ], 400);
        }
        return response()->json($equipo);
    }

    public function show($id)
    {
        return DB::table('equipos')
        ->join('categorias','categorias.id','=', 'equipos.Cod_Categoria')
        ->select( 'equipos.*', 'categorias.Categoria')
        ->where('categorias.id', $id)
        ->whereBetween('equipos.NumJug', [6, 12])
        ->get(); //busca un equipo especifico y lo devuelve
    }

    public function update(Request $request, $id)
    {
        $equipo = equipo::find($id);
        if(!is_null($equipo)){
            $equipo->update($request->all());
            return $equipo;
        }
    }

    public function destroy($id)
    {
        $equipo = equipo::find($id);
        $equipo->delete();
    }

}
