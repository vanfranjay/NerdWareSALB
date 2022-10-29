<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticias_T;

class NoticiasTController extends Controller
{
    public function index()
    {
        return Noticias_T::all();
    }

    public function store(Request $request)
    {
        $noticias_T = new Noticias_T($request->all());
        $noticias_T->save();
        return $noticias_T;
    }

    public function show($id)
    {
        return Noticias_T::find($id);//busca uno especifico y lo duevelve
    }

    public function update(Request $request, $id)
    {
        $noticias_T = Noticias_T::find($id);
        if(!is_null($noticias_T)){
            $noticias_T->update($request->all());
            return $noticias_T;
        }
    }

    public function destroy($id)
    {
        $noticias_T = Noticias_T::find($id);
        $noticias_T->delete();
    }

}
