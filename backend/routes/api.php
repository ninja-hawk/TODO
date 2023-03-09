<?php
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Resources\TaskResource;
use App\Models\Task;
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


Route::group(['middleware' => ['session']], function () {
    Route::get('login/{provider}', [SocialController::class,'redirect']);
    Route::get('login/{provider}/callback',[SocialController::class,'callback']);
});

Route::resource('/users', UserController::class);
Route::resource('/todos', TodoController::class);
Route::resource('/subjects', SubjectController::class);
Route::resource('/tasks', TaskController::class);

Route::put('/task/text/{id}', [TaskController::class, 'text']);
Route::put('/task/due/{id}', [TaskController::class, 'due']);
Route::put('/task/mtg/{id}', [TaskController::class, 'mtg']);
Route::put('/task/done/{id}', [TaskController::class, 'done']);
Route::put('/task/priority/{id}', [TaskController::class, 'priority']);

