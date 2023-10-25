<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Subtask;

class TaskController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::with("status", "tasklists")->orderBy("created_at", "ASC")->get();

        return response()->json($tasks, 200);
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
        $task_data = $request->task;

        // TASK
        $new_task = Task::create($task_data);

        // SUBTASK
        $new_subtasks = array_map(function ($subtask) {
            return new Subtask(['text' => $subtask["text"]]);
        }, $task_data["subtasks"]);

        // JOIN MODELS
        foreach ($new_subtasks as $new_subtask) {
            $new_task->subtasks()->save($new_subtask);
        }

        return response()->json($new_task->load('subtasks'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::with("status", "subtasks", "tasklist", "tasklist.project")->where("task_id", $id)->first();

        return response()->json($task, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // return Task::where("task_id", $id)->findOrFail($id);
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
        $existing_task = Task::findOrFail($id);

        $patch_task = $request["task"];

        if ($existing_task) {
            $existing_task->fill($patch_task);

            if ($patch_task["status_id"] === "3") {
                $existing_task->is_priority = false;
            }

            // Handle subtasks
            if (isset($patch_task["subtasks"])) {
                foreach ($patch_task["subtasks"] as $subtask) {
                    // if there's an ID, update existing subtask
                    if (isset($subtask["subtask_id"])) {
                        $existing_subtask = $existing_task->subtasks()->findOrFail($subtask["subtask_id"]);
                        $existing_subtask->update($subtask);
                    } else {
                        // if no ID, create a new subtask
                        $existing_task->subtasks()->create($subtask);
                    }
                }
            }

            $existing_task->save();
        }

        return response()->json($existing_task, 200);
    }

    public function deleteSubtask($subtask_id)
    {
        $existing_subtask = Subtask::find($subtask_id);

        if ($existing_subtask) {
            $existing_subtask->delete();
            return response()->json(null, 204);
        }

        return "Task not found";
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // For debugging or intentional error, use:
        // return response()->json(['error' => 'Intentional fatal error.' . $id], 400);

        $existingTask = Task::find($id);

        if ($existingTask) {
            $existingTask->delete();
            return response()->json(null, 204);
        }

        return response()->json(['error' => 'Task not found'], 404);
    }
}
