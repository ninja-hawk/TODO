<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubjectTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subject_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('task_id');
            $table->timestamps();

            $table->foreign('subject_id')->references('id')->cascadeOnDelete()->on('subjects');
            $table->foreign('task_id')->references('id')->cascadeOnDelete()->on('tasks');
            $table->softDeletes($column='deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subject_tasks');
    }
}
