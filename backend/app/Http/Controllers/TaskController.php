<?php

namespace App\Http\Controllers;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $task = Task::create([
            "subject_id" => $request->subject_id,
            "done" => $request->done,
            "text" => $request->text,
            "time" => $request->time,
            "due" => $request->due,
            "mtg" => $request->mtg,
            "priority" => $request->priority
        ]);

        return response()->json($task,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function done($id)
    {
        $task = new TaskResource(Task::findOrFail($id));
        Task::findOrFail($id)->update([
            'done' => !$task->done,
        ]);
        $task = new TaskResource(Task::findOrFail($id));
        return response()->json($task,200);
    }
    public function due(Request $request, $id)
    {
        Task::findOrFail($id)->update([
            'due' => $request->due,
        ]);
        $task = new TaskResource(Task::findOrFail($id));
        return response()->json($task,200);
    }

    public function mtg($id)
    {
        $task = new TaskResource(Task::findOrFail($id));
        Task::findOrFail($id)->update([
            'mtg' => !$task->mtg,
        ]);
        $task = new TaskResource(Task::findOrFail($id));
        return response()->json($task,200);
    }

    public function priority($id)
    {
        $task = new TaskResource(Task::findOrFail($id));
        Task::findOrFail($id)->update([
            'priority' => !$task->priority,
        ]);
        $task = new TaskResource(Task::findOrFail($id));
        return response()->json($task,200);
    }
    public function text(Request $request, $id)
    {
        Task::findOrFail($id)->update([
            'text' => $request->text,
        ]);
        $task = new TaskResource(Task::findOrFail($id));
        return response()->json($task,200);
    }

}
