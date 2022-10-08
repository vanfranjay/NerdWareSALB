<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Persona;
use Faker\Provider\ar_JO\Person;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Persona::all();
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
        // $request->validate([
        //     'imagen' => 'required|imagen|dimensions:min_width=300,min_height=300',
        // ]);
        // $persona = new persona($request->all());
        // $path = $request->imagen->store('public/personas');
        // $persona->imagen = $path;
        // $persona->save(); 
        $request -> validate([
            'nombre' => 'required', 
            'apellido' => 'required', 
            'rol' => 'required', 
            'imagen', 
            'fecha_nacimiento' => 'required', 
            'telefono' => 'required',
            'email' => 'required | email | unique:App\Models\Persona', 
            'password' => 'required | confirmed', 
            'password_confirmation' => 'required',
        ],
        [
            'nombre.required' => 'Este campo es requerido',
            'apellido.required' => 'Este campo es requerido',
            'rol.required' => 'Este campo es requerido',
            'fecha_nacimiento.required' => 'Este campo es requerido',
            'telefono.required' => 'Este campo es requerido',
            'email.required' => 'Este campo es requerido',
            'email.email' => 'El correo no es valido',
            'email.unique' => 'El correo ya existe',
            'password.required' => 'Este campo es requerido',
            'password.confirmed' => 'La contraseña es diferente',
            'password_confirmation.required' => 'Este campo es requerido',
        ]
    );
        // Persona::create($request->all());
        $persona = new Persona($request->all());
        $persona->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Persona::find($id);
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
        $persona = Persona::findOrfail($id);
        $persona->update($request->all());
        //return $persona;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Persona::find($id)->delete();
    }
}

