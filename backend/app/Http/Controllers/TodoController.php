<?php

namespace App\Http\Controllers;
use App\Http\Resources\TodoCollection;
use App\Http\Resources\TodoResource;
use App\Models\Todo;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // collectionはrouteで直接返す用
        // data->dataの入れ子になる
        // return new TodoCollection(Todo::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $newtodo = Todo::create([
            "title" => "Your Todo",
            "share" => true,
            "password" => null,
            "user_id" => null
        ]);
        // $todo = new TodoResource(Todo::findOrFail($newtodo->id));
        return response()->json($newtodo->id,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(Todo::where('id', '=', $id)->exists()){
            $todo = new TodoResource(Todo::findOrFail($id));
            return response()->json($todo,200);
        }
        else{
            //新たなid対策
            //ここはcreateしてからしか受け付けない
            // $newtodo = Todo::create([
            //     "title" => "Your Todo",
            //     "share" => true,
            //     "password" => null,
            //     "user_id" => null
            // ]);
            // $todo = new TodoResource(Todo::findOrFail($newtodo->id));
            $error = array("error" => "You've Got Something Wrong wtih Prameters");
            return response()->json($error,400);
        }
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
        Todo::findOrFail($id)->update([
            'title' => $request->title,
            'share' => $request->share,
            'password' => $request->password
        ]);
        $todo = new TodoResource(Todo::findOrFail($id));
        return response()->json($todo,200);
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
}
