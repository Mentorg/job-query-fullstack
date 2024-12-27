<?php

use App\Models\Job;
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
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('is_fulltime');
            $table->string('work_preference');
            $table->string('seniority');
            $table->integer('experience');
            $table->integer('salary_from');
            $table->integer('salary_to');
            $table->boolean('is_salary_monthly');
            $table->integer('applicants')->default(0);
            $table->string('status')->default('open');
            $table->boolean('has_visa_sponsorship');
            $table->string('education');
            $table->string('slug')->unique()->after('title');
            $table->text('position_overview');
            $table->timestamps();
            $table->dateTime('deadline');
            $table->unsignedBigInteger('recruiter_id');
            $table->foreign('recruiter_id')->references('id')->on('recruiters')->cascadeOnDelete();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });

        Schema::create('qualifications', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->unsignedBigInteger('job_listings_id');
            $table->foreign('job_listings_id')->references('id')->on('job_listings')->cascadeOnDelete();
        });

        Schema::create('responsibilities', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->unsignedBigInteger('job_listings_id');
            $table->foreign('job_listings_id')->references('id')->on('job_listings')->cascadeOnDelete();
        });

        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('status')->default('received');
            $table->string('resume')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('applicant_id');
            $table->foreign('applicant_id')->references('id')->on('applicants');
            $table->unsignedBigInteger('job_listings_id');
            $table->foreign('job_listings_id')->references('id')->on('job_listings')->cascadeOnDelete();
        });

        Schema::create('job_listings_location', function (Blueprint $table) {
            $table->unsignedBigInteger('job_listings_id')->nullable();
            $table->foreign('job_listings_id')->references('id')->on('job_listings')->cascadeOnDelete();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')->references('id')->on('locations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
        Schema::dropIfExists('qualifications');
        Schema::dropIfExists('responsibilities');
        Schema::dropIfExists('applications');
        Schema::dropIfExists('job_listings_location');
    }
};
