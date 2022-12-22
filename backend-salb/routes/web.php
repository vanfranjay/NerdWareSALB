<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Configuracion por defecto no carga la pagina principal de la app ---->No Funciona

Route::get('/', function () {
    return view('index');
});
*/

Route::fallback(function() {
    return view('index');
});

/*
Web TIS configuracion recomendada ---->No Funciona

Route::get('/{any}', function () {
    return view('index');
})->where('any','.*');
*/



/*
No funciona

Route::get('/{any}', function ($any) {

  return view('index');

})->where('any', '.*');
*/