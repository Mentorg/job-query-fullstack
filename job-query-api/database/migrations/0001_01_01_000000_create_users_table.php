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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('country');
            $table->string('code');
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('linkedin_profile')->nullable();
            $table->string('language')->nullable();
            $table->string('timezone')->nullable();
            $table->boolean('mfa')->nullable();
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')->references('id')->on('locations');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('recruiters', function (Blueprint $table) {
            $table->id();
            $table->text('expertise')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->constrained()->references('id')->on('users')->cascadeOnDelete();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->constrained()->references('id')->on('companies')->cascadeOnDelete();
            $table->unsignedBigInteger('currency_id')->nullable();
            $table->foreign('currency_id')->references('id')->on('currencies');
        });

        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->constrained()->references('id')->on('users')->cascadeOnDelete();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('title');
            $table->dateTime('date_start');
            $table->dateTime('date_end');
            $table->unsignedBigInteger('applicant_id')->nullable();
            $table->foreign('applicant_id')->references('id')->on('applicants')->cascadeOnDelete();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')->references('id')->on('locations')->cascadeOnDelete();
        });

        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('department');
            $table->string('degree');
            $table->string('university');
            $table->string('honors');
            $table->decimal('gpa', 3, 2);
            $table->dateTime('date_start');
            $table->dateTime('date_end');

            $table->unsignedBigInteger('applicant_id')->nullable();
            $table->foreign('applicant_id')->references('id')->on('applicants')->cascadeOnDelete();
        });

        Schema::create('applicant_skill', function (Blueprint $table) {
            $table->unsignedBigInteger('applicant_id');
            $table->foreign('applicant_id')->references('id')->on('applicants')->cascadeOnDelete();
            $table->unsignedBigInteger('skill_id');
            $table->foreign('skill_id')->references('id')->on('skills')->cascadeOnDelete();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('description');
        });

        Schema::create('applicant_language', function (Blueprint $table) {
            $table->unsignedBigInteger('applicant_id')->nullable();
            $table->foreign('applicant_id')->references('id')->on('applicants')->cascadeOnDelete();

            $table->unsignedBigInteger('language_id')->nullable();
            $table->foreign('language_id')->references('id')->on('languages')->cascadeOnDelete();
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('description');
        });

        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->string('name');
            $table->string('symbol_native');
            $table->integer('decimal_digits');
            $table->integer('rounding');
            $table->string('code');
            $table->string('name_plural');
        });

        Schema::create('notification_setting', function (Blueprint $table) {
            $table->id();
            $table->boolean('new_candidate');
            $table->boolean('communication_updates');
            $table->boolean('hiring_stage');
            $table->boolean('resume_status');
            $table->boolean('events_update');
            $table->boolean('recruitment_dates');
            $table->boolean('security_alerts');
            $table->boolean('renewal_dates');
            $table->unsignedBigInteger('recruiter_id')->nullable();
            $table->foreign('recruiter_id')->references('id')->on('recruiters')->cascadeOnDelete();
        });

        Schema::create('notification_type', function (Blueprint $table) {
            $table->id();
            $table->string('description')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('recruiters');
        Schema::dropIfExists('applicants');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('applicant_skill');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('applicant_language');
        Schema::dropIfExists('languages');
        Schema::dropIfExists('currencies');
        Schema::dropIfExists('notification_setting');
        Schema::dropIfExists('notification_type');
        Schema::dropIfExists('notifications');
    }
};
