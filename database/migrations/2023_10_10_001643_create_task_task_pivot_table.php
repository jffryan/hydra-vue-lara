<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskTaskPivotTable extends Migration
{
    public function up()
    {
        Schema::create('task_task', function (Blueprint $table) {
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('related_task_id');
            $table->timestamps();

            $table->primary(['task_id', 'related_task_id']);

            $table->foreign('task_id')
                ->references('task_id')->on('tasks')
                ->onDelete('cascade');

            $table->foreign('related_task_id')
                ->references('task_id')->on('tasks')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_task');
    }
}
