<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DelegadoController;
use App\Http\Controllers\DelBolController;
use App\Http\Controllers\JugadorController; 
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\BoletaController;
use App\Http\Controllers\EquipoController;
<<<<<<< HEAD
use App\Http\Controllers\DelegadoController;
use App\Http\Controllers\DelBolController;
=======

>>>>>>> 27e605b75b1f33ec339945f5ff847fb8855479a5
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
  //  return $request->user();
//});
Route::resource('boletas', BoletaController::class);
<<<<<<< HEAD
Route::resource('equipo', EquipoController::class);
Route::resource('delegados', DelegadoController::class);
Route::resource('delbos', DelBolController::class);
=======
Route::resource('personas', PersonaController::class);
Route::resource('delegados', DelegadoController::class);
Route::resource('delbos', DelBolController::class);
Route::resource('equipos', EquipoController::class);
Route::resource('jugadores', JugadorController::class);

>>>>>>> 27e605b75b1f33ec339945f5ff847fb8855479a5
