<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodoSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todo_subjects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('todo_id');
            $table->unsignedBigInteger('subject_id');
            $table->timestamps();

            $table->foreign('todo_id')->references('id')->cascadeOnDelete()->on('todos');
            $table->foreign('subject_id')->references('id')->cascadeOnDelete()->on('subjects');
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
        Schema::dropIfExists('todo_subjects');
    }
}
