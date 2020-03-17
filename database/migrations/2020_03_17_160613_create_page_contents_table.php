<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('page_id')->index();
            $table->string('key');
            $table->text('value')->nullable();
            $table->timestamps();

            $table->foreign('page_id')
                  ->references('id')
                  ->on('pages')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_contents');
    }
}
