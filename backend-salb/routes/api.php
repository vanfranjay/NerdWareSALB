<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DelegadoController;
use App\Http\Controllers\DelBolController;
use App\Http\Controllers\JugadorController; 
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\BoletaController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FotoTController;
use App\Http\Controllers\TorneoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\NoticiasTController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\Rol_partidoController;
use App\Http\Controllers\Tabla_posisionController;

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
Route::resource('equipos', EquipoController::class);
Route::resource('delegados', DelegadoController::class);
Route::resource('personas', PersonaController::class);
Route::resource('delbos', DelBolController::class);
Route::resource('jugadores', JugadorController::class);
Route::resource('torneos', TorneoController::class);
Route::resource('fotos', FotoTController::class);
Route::resource('categorias', CategoriaController::class);
Route::resource('noticias_t_s', NoticiasTController::class);
Route::resource('partidos', PartidoController::class);
Route::resource('rol_partidos', Rol_partidoController::class);
Route::resource('tabla_posiciones', Tabla_posisionController::class);
//route::resource('auts', AuthController::class);

  //Prefijo V1, todo lo que este dentro de este grupo se accedera escribiendo v1 en el navegador, es decir /api/v1/*
  Route::post('login', [AuthController::class, 'authenticate']);
  Route::post('register', [AuthController::class, 'register']);
  //Route::get('products', [ProductsController::class, 'index']);
  //Route::get('products/{id}', [ProductsController::class, 'show']);
  Route::group(['middleware' => ['jwt.verify']], function() {
      //Todo lo que este dentro de este grupo requiere verificación de usuario.
      Route::post('logout', [AuthController::class, 'logout']);
      Route::post('get-user', [AuthController::class, 'getUser']);
    //  Route::post('products', [ProductsController::class, 'store']);
     // Route::put('products/{id}', [ProductsController::class, 'update']);
      //Route::delete('products/{id}', [ProductsController::class, 'destroy']);
  });
