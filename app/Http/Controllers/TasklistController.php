<?php

namespace App\Http\Controllers;

use App\Models\Tasklist;
use Illuminate\Http\Request;

class TasklistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasklists = Tasklist::with("tasks", "tasks.status")->orderBy("created_at", "ASC")->get();
        
        return response()->json($tasklists, 200);
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
        $tasklist_data = $request->tasklist;

        // TASK
        $new_tasklist = Tasklist::create($tasklist_data);

        return response()->json($new_tasklist, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tasklist  $tasklist
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tasklist = Tasklist::with("tasks", "tasks.status", "tasks.subtasks", "project")->where("tasklist_id", $id)->first();

        if (!$tasklist) {
            return response()->json(['error' => 'Tasklist not found'], 404);
        }
        
        return response()->json($tasklist, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tasklist  $tasklist
     * @return \Illuminate\Http\Response
     */
    public function edit(Tasklist $tasklist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tasklist  $tasklist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $existing_tasklist = Tasklist::findOrFail($id);
    
        $attributes = $request->input('tasklist');
    
        $existing_tasklist->update($attributes);
    
        $existing_tasklist->refresh()->load("tasks", "tasks.status", "tasks.subtasks", "project");
    
        return response()->json($existing_tasklist, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tasklist  $tasklist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tasklist $tasklist)
    {
        //
    }
}
