<?php

use App\Http\Controllers\Api\V1\ApplicantController;
use App\Http\Controllers\Api\V1\ApplicationController;
use App\Http\Controllers\Api\V1\CompanyController;
use App\Http\Controllers\Api\V1\CurrencyController;
use App\Http\Controllers\Api\V1\JobController;
use App\Http\Controllers\Api\V1\LanguageController;
use App\Http\Controllers\Api\V1\LocationController;
use App\Http\Controllers\Api\V1\RecruiterController;
use App\Http\Controllers\Api\V1\RegisterUserController;
use App\Http\Controllers\Api\V1\SessionController;
use App\Http\Controllers\Api\V1\SkillController;
use App\Http\Controllers\Api\V1\SubscriptionController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::post('/register', [RegisterUserController::class, 'store']);
    Route::post('/login', [SessionController::class, 'store']);
    Route::post('/logout', [SessionController::class, 'destroy'])->middleware('auth:sanctum');

    // UserController
    Route::middleware('auth:sanctum')->group(function () {
        Route::put('/email', [UserController::class, 'updateEmail']);
        Route::put('/password', [UserController::class, 'updatePassword']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/user', [UserController::class, 'show']);
        Route::post('/profile/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
        Route::put('/user/locale', [UserController::class, 'updateLocaleSetting']);
    });

    // RecruiterController
    Route::middleware('auth:sanctum')->prefix('recruiter')->group(function () {
        Route::get('/', [RecruiterController::class, 'show']);
        Route::put('/', [RecruiterController::class, 'update']);
        Route::get('/team', [RecruiterController::class, 'getCompanyRecruiters']);
        Route::get('/company', [RecruiterController::class, 'getRecruiterCompany']);
        Route::put('/notificationSettings', [RecruiterController::class, 'updateNotificationSetting']);
        Route::get('/notificationSettings', [RecruiterController::class, 'getNotificationSettings']);
        Route::put('/currency', [RecruiterController::class, 'updateCurrency']);
    });

    // CompanyController
    Route::controller(CompanyController::class)->group(function () {
        Route::get('/companies', 'index');
        Route::get('/company/locations', 'getLocations')->middleware('auth:sanctum');
        Route::put('/company/{company}/locations', 'updateLocation');
        Route::post('/companies', 'store');
        Route::get('/company/{company}', 'show');
        Route::post('/company/{company}', 'update')->middleware('auth:sanctum');
        Route::delete('/companies/{company}', 'destroy')->middleware('auth:sanctum');
        Route::get('/company/{company}/jobs', 'getCompanyJobs')->middleware('auth:sanctum');
        Route::get('/company/{company}/recruiters', 'getCompanyRecruiters')->middleware('auth:sanctum');
        Route::get('/companies/subscription', 'getSubscription')->middleware('auth:sanctum');
        Route::put('/company/{company}/subscriptions', 'updateSubscription');
        Route::get('/companies/billingSettings', 'getBillingSettings')->middleware('auth:sanctum');
        Route::put('/company/{company}/billingSetting', 'updateBillingSetting');
        Route::get('/companies/paymentMethods', 'getPaymentMethods')->middleware('auth:sanctum');
        Route::post('/company/paymentMethod', 'createPaymentMethod')->middleware('auth:sanctum');
        Route::put('/company/paymentMethod/{payment}', 'updatePaymentMethod')->middleware('auth:sanctum');
        Route::delete('/company/paymentMethod/{payment}', 'deletePaymentMethod')->middleware('auth:sanctum');
        Route::put('/company/paymentMethod/{payment}/default', 'setDefaultPaymentMethod')->middleware('auth:sanctum');
    });

    // JobController
    Route::controller(JobController::class)->prefix('jobs')->group(function () {
        Route::get('/', 'index');
        Route::get('/{job}', 'show');
        Route::post('/', 'store');
        Route::get('/recruiter/{user}', 'getJobsByRecruiter');
        Route::put('/updateStatus/{job}', 'updateStatus');
        Route::get('/location/{job}', 'getJobLocation');
        Route::put('/{job}', 'update')->middleware('auth:sanctum');
        Route::delete('/{job}', 'destroy')->middleware('auth:sanctum');
    });

    // ApplicationController
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/applicants/{user}/jobs', [ApplicationController::class, 'getApplicantJobs']);
        Route::get('/recruiter/applications', [ApplicationController::class, 'getRecruiterApplications']);
        Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);
        Route::put('/application/{application}/status', [ApplicationController::class, 'updateStatus']);
        Route::put('/application/{application}/note', [ApplicationController::class, 'updateNote']);
    });

    // ApplicantController
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/applicant', [ApplicantController::class, 'show']);
        Route::post('/applicants/education', [ApplicantController::class, 'createEducation']);
        Route::put('/applicants/{applicant}/education/{education}', [ApplicantController::class, 'updateEducation']);
        Route::delete('/applicants/{applicant}/education/{education}', [ApplicantController::class, 'deleteEducation']);
        Route::post('/applicants/experience', [ApplicantController::class, 'createExperience']);
        Route::put('/applicants/{applicant}/experience/{experience}', [ApplicantController::class, 'updateExperience']);
        Route::delete('/applicants/{applicant}/experience/{experience}', [ApplicantController::class, 'deleteExperience']);
        Route::put('/applicant/update/skills', [ApplicantController::class, 'updateSkills']);
        Route::put('/applicant/update/languages', [ApplicantController::class, 'updateLanguages']);
    });

    // Other controllers (System related controllers)
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::get('/locations', [LocationController::class, 'index']);
    Route::get('/currencies', [CurrencyController::class, 'index']);
    Route::get('/skills', [SkillController::class, 'index']);
    Route::get('/languages', [LanguageController::class, 'index']);
});
