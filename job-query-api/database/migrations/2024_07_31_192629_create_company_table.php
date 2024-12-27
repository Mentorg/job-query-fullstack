<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('description');
            $table->string('address');
            $table->string('facebook')->unique();
            $table->string('linkedin')->unique();
            $table->string('twitter')->unique();
            $table->string('website')->unique();
            $table->string('avatar')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('billing_setting', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->boolean('is_autorenew');
            $table->timestamps();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('card_type');
            $table->string('card_number');
            $table->date('expiration_date');
            $table->string('cvv');
            $table->boolean('is_active');
            $table->timestamps();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });

        Schema::create('company_location', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')->references('id')->on('locations')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
        Schema::dropIfExists('billing_setting');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('company_location');
    }
};
