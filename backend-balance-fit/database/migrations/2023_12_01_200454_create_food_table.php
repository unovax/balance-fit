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
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->string('img')->default('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
            $table->string('barcode');
            $table->string('name');
            $table->string('description');
            $table->decimal('calories', 6, 2);
            $table->decimal('carbohydrates', 6, 2);
            $table->decimal('proteins', 6, 2);
            $table->decimal('fats', 6, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('food');
    }
};
