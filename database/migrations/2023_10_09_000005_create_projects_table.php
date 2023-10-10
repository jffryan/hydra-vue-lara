<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id('project_id');
            $table->string("name");
            $table->boolean("is_pinned")->default(false);
            $table->timestamps();
        });

        Schema::table('tasklists', function (Blueprint $table) {
            $table->unsignedBigInteger("project_id")->index();
            $table->foreign("project_id")->references("project_id")
                ->on("projects")
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
        Schema::dropIfExists('projects');
    }
};
