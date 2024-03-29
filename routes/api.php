<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TasklistController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\LoginController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource("projects", ProjectController::class);
    Route::apiResource("tasklists", TasklistController::class);
    Route::apiResource("tasks", TaskController::class);
    Route::delete('subtask/{subtask_id}', [TaskController::class, 'deleteSubtask']);
});

