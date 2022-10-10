<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DelegadoController;
use App\Http\Controllers\DelBolController;
use App\Http\Controllers\JugadorController; 
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\BoletaController;
use App\Http\Controllers\EquipoController;

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
Route::apiResource('boletas', BoletaController::class);
Route::apiResource('equipo', EquipoController::class);
Route::apiResource('delegados', DelegadoController::class);
Route::apiResource('personas', PersonaController::class);
Route::apiResource('delbos', DelBolController::class);
Route::apiResource('jugadores', JugadorController::class);
