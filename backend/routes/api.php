<?php
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


Route::resource('/users', UserController::class);
Route::resource('/todos', TodoController::class);
Route::resource('/tasks', TaskController::class);

Route::put('/task/text/{id}', function (Request $request, $id) {
    Task::findOrFail($id)->update([
        'text' => $request->text,
    ]);
    $task = new TaskResource(Task::findOrFail($id));
    return response()->json($task,200);
});

Route::put('/task/due/{id}', function (Request $request, $id) {
    Task::findOrFail($id)->update([
        'due' => $request->due,
    ]);
    $task = new TaskResource(Task::findOrFail($id));
    return response()->json($task,200);
});

Route::put('/task/mtg/{id}', function ($id) {
    $task = new TaskResource(Task::findOrFail($id));
    Task::findOrFail($id)->update([
        'mtg' => !$task->mtg,
    ]);
    $task = new TaskResource(Task::findOrFail($id));
    return response()->json($task,200);
});

Route::put('/task/done/{id}', function ($id) {
    $task = new TaskResource(Task::findOrFail($id));
    Task::findOrFail($id)->update([
        'done' => !$task->done,
    ]);
    $task = new TaskResource(Task::findOrFail($id));
    return response()->json($task,200);
});

Route::put('/task/priority/{id}', function ($id) {
    $task = new TaskResource(Task::findOrFail($id));
    Task::findOrFail($id)->update([
        'priority' => !$task->priority,
    ]);
    $task = new TaskResource(Task::findOrFail($id));
    return response()->json($task,200);
});

// Route::get('/user/{id}', function ($id) {
//     return new UserResource(User::findOrFail($id));
// });

// Route::get('/todo/{id}', function ($id) {
//     return new TodoResource(Todo::findOrFail($id));
// });


