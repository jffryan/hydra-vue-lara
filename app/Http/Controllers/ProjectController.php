<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;

class ProjectController extends Controller
{
    /**
     * Middleware
     * 
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = auth()->user()->projects()->orderBy("name", "ASC")->get();

        return response()->json($projects, 200);
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
        $project_data = $request->project;
        $new_project = new Project($project_data);
        auth()->user()->projects()->save($new_project);
        return response()->json($new_project, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = auth()->user()->projects()->with([
            'tasklists' => function ($query) {
                $query->orderBy('name', 'ASC');
            },
            'tasklists.tasks'
        ])
            ->where("project_id", $id)
            ->first();

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }


        return response()->json($project, 200);
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
        $existing_project = auth()->user()->projects()->findOrFail($id);
        $patch_project = $request["project"];

        $existing_project->fill($patch_project);

        $existing_project->save();
        return response()->json($existing_project->load("tasklists", "tasklists.tasks"), 200);
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
        // return response()->json(['error' => 'Intentional fatal error. ' . $id], 400);
        $existingProject = auth()->user()->projects()->find($id);

        if ($existingProject) {
            $existingProject->delete();
            return response()->json(null, 204);
        }

        return "Project not found";
    }
}
