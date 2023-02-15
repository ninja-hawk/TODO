<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::resource('/users', UserController::class);
Route::resource('/todos', TodoController::class);


// Route::get('/user/{id}', function ($id) {
//     return new UserResource(User::findOrFail($id));
// });

// Route::get('/todo/{id}', function ($id) {
//     return new TodoResource(Todo::findOrFail($id));
// });


