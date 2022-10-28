<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        return Categoria::all();
    }

    public function store(Request $request){
        $categoria = new Categoria($request->all());
        $categoria->save();
        return $categoria;
    }

    public function show($id)
    {
        return Categoria::find($id); //busca uno especifico y lo devuelve
    }

    public function update(Request $request, $id)
    {
        $categoria = Categoria::find($id);
        if(!is_null($categoria)){
            $categoria->update($request->all());
            return $categoria;
        }
    }

    public function destroy($id)
    {
        $categoria = Categoria::find($id);
        $categoria->delete();
    }

}
