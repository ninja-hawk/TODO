<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subject_id');
            $table->text('text',30);
            $table->date('due')->nullable();
            $table->time('time', $precision = 0)->nullable();
            $table->boolean('done');
            $table->boolean('mtg');
            $table->boolean('priority');
            $table->timestamps();
            $table->softDeletes($column='deleted_at');

            $table->foreign('subject_id')->references('id')->cascadeOnDelete()->on('subjects');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
