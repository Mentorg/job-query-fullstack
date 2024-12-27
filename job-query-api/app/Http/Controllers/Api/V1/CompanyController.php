<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreCompanyRequest;
use App\Http\Requests\Api\V1\StorePaymentRequest;
use App\Http\Requests\Api\V1\UpdateCompanyRequest;
use App\Http\Requests\Api\V1\UpdatePaymentRequest;
use App\Models\Company;
use App\Models\Payment;
use App\Services\Api\V1\CompanyService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CompanyController extends Controller implements HasMiddleware
{
    use AuthorizesRequests;

    protected $companyService;

    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        return response()->json($this->companyService->getCompanies());
    }

    public function store(StoreCompanyRequest $request)
    {
        $this->authorize('create', Company::class);

        $createdCompany = $this->companyService->create($request->validated(), $request);

        return $createdCompany
            ? ResponseHelper::successResponse($createdCompany, 'Company created successfully.')
            : ResponseHelper::errorResponse('Failed to create company!', 400);
    }

    public function show(Company $company)
    {
        $company = $this->companyService->getById($company);

        return response()->json($company);
    }

    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $this->authorize('update', $company);

        $updatedCompany = $this->companyService->update($company, $request->validated());

        return $updatedCompany
            ? ResponseHelper::successResponse($updatedCompany, 'Company updated successfully.')
            : ResponseHelper::errorResponse('Failed to update company!', 400);
    }

    public function destroy(Company $company)
    {
        $this->authorize('delete', $company);

        $deletedCompany = $this->companyService->delete($company);

        return ResponseHelper::successResponse($deletedCompany, 'Company deleted successfully.');
    }

    public function getCompanyJobs(Company $company)
    {
        $companyJobs = $this->companyService->getCompanyJobs($company);

        return response()->json($companyJobs);
    }

    public function getCompanyRecruiters(Company $company)
    {
        $companyRecruiters = $this->companyService->getCompanyRecruiters($company);

        return response()->json($companyRecruiters);
    }

    public function getLocations(Request $request)
    {
        $companyLocations = $this->companyService->getLocations($request);

        return response()->json($companyLocations);
    }

    public function updateLocation(Request $request, Company $company)
    {
        $this->authorize('update', $company);

        $validated = $request->validate([
            'locations' => 'array',
            'locations.*' => 'integer|exists:location,id',
        ]);

        $updatedLocation = $this->companyService->updateLocation($company, $validated);

        return $updatedLocation
            ? ResponseHelper::successResponse($updatedLocation, 'Company locations updated successfully.')
            : ResponseHelper::errorResponse('Failed to update company locations!', 400);
    }

    public function getSubscription(Request $request)
    {
        $subscription = $this->companyService->getSubscription($request);

        return response()->json($subscription);
    }

    public function updateSubscription(Request $request, Company $company)
    {
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
        ]);

        $updatedSubscription = $this->companyService->updateSubscription($company, $validated);

        return $updatedSubscription
            ? ResponseHelper::successResponse($updatedSubscription, 'Company subscription updated successfully.')
            : ResponseHelper::errorResponse('Failed to update company subscription!', 400);
    }

    public function getBillingSettings(Request $request)
    {
        $billingSettings = $this->companyService->getBillingSettings($request);

        return response()->json($billingSettings);
    }

    public function updateBillingSetting(Request $request, Company $company)
    {
        $validated = $request->validate([
            'email' => 'sometimes|required|email',
            'is_autorenew' => 'sometimes|required|boolean'
        ]);

        $updatedBillingSetting = $this->companyService->updateBillingSetting($company, $validated);

        return $updatedBillingSetting
            ? ResponseHelper::successResponse($updatedBillingSetting, 'Company billing settings updated successfully.')
            : ResponseHelper::errorResponse('Failed to update company billing settings!', 400);
    }

    public function getPaymentMethods(Request $request)
    {
        $paymentMethods = $this->companyService->getPaymentMethods($request);

        return response()->json($paymentMethods);
    }

    public function createPaymentMethod(StorePaymentRequest $request)
    {
        $createdPaymentMethod = $this->companyService->createPaymentMethod($request->validated(), $request);

        return $createdPaymentMethod
            ? ResponseHelper::successResponse($createdPaymentMethod, 'Payment method created successfully.')
            : ResponseHelper::errorResponse('Failed to create payment method!', 400);
    }

    public function updatePaymentMethod(UpdatePaymentRequest $request, Payment $payment)
    {
        $updatedPaymentMethod = $this->companyService->updatePaymentMethod($payment, $request->validated());

        return $updatedPaymentMethod
            ? ResponseHelper::successResponse($updatedPaymentMethod, 'Payment method updated successfully.')
            : ResponseHelper::errorResponse('Failed to update payment method!', 400);
    }

    public function deletePaymentMethod(Payment $payment)
    {
        $deletePaymentMethod = $this->companyService->deletePaymentMethod($payment);

        return ResponseHelper::successResponse($deletePaymentMethod, 'Payment method deleted successfully.');
    }

    public function setDefaultPaymentMethod(Request $request, $paymentId)
    {
        $validated = $request->validate([
            'isActive' => 'required|boolean'
        ]);

        $updatedDefaultPaymentMethod = $this->companyService->setDefaultPaymentMethod($paymentId, $validated, $request);

        return $updatedDefaultPaymentMethod
            ? ResponseHelper::successResponse($updatedDefaultPaymentMethod, 'Default payment method updated successfully.')
            : ResponseHelper::errorResponse('Failed to update default payment method!', 400);
    }
}
