<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoletaController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\DelegadoController;
use App\Http\Controllers\DelBolController;
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
Route::resource('equipo', EquipoController::class);
Route::resource('delegados', DelegadoController::class);
Route::resource('delbos', DelBolController::class);
