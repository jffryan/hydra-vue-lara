<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;



return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */



    public function up()
    {
        Schema::create('tasklists', function (Blueprint $table) {
            $table->id("tasklist_id");
            $table->string("name");
            $table->boolean("is_pinned")->default(false);
            $table->timestamps();
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedBigInteger("tasklist_id")->index();
            $table->foreign("tasklist_id")
                ->references("tasklist_id")
                ->on("tasklists")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::dropIfExists('tasklists');
    }
};