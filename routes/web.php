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

Route::get('/', function () {
    return redirect('/calendar/2018/7');
});

Route::get('/calendar/{vue_capture?}', function () {
    return view('calendar');
})->where('vue_capture', '[\/\w\.-]*');

Route::prefix('api')->group(function () {
    Route::get('/event', 'EventController@getEvent');
    Route::post('/event', 'EventController@saveEvent');
});
