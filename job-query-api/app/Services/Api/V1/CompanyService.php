<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\CompanyCollection;
use App\Http\Resources\V1\CompanyResource;
use App\Http\Resources\V1\JobCollection;
use App\Http\Resources\V1\LocationCollection;
use App\Http\Resources\V1\PaymentMethodCollection;
use App\Http\Resources\V1\PaymentMethodResource;
use App\Interfaces\CompanyServiceInterface;
use App\Models\Company;
use App\Models\CompanySubscription;
use App\Notifications\CompanyRegisteredNotification;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CompanyService implements CompanyServiceInterface
{
    protected function getAuthenticatedRecruiter($request)
    {
        return $request->user()->recruiter;
    }

    protected function handleCompanyAttributes(array $validated)
    {
        return [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'description' => $validated['description'],
            'address' => $validated['address'],
            'facebook' => $validated['facebook'],
            'linkedin' => $validated['linkedin'],
            'twitter' => $validated['twitter'],
            'website' => $validated['website'],
            'avatar' => $validated['avatar'],
            'slug' => $validated['slug'],
            'phone' => $validated['phone'],
        ];
    }

    protected function handlePaymentMethodAttributes(array $validated)
    {
        return [
            'card_type' => $validated['cardType'],
            'card_number' => $validated['cardNumber'],
            'expiration_date' => $validated['expirationDate'],
            'cvv' => $validated['cvv'],
            'is_active' => $validated['isActive'],
        ];
    }

    public function getCompanies()
    {
        return new CompanyCollection(Company::with('locations')->orderBy('name')->get());
    }

    public function create(array $validated, $request)
    {
        DB::beginTransaction();

        try {
            if ($request->hasFile('avatar')) {
                $validated['avatar'] = $request->file('avatar')->store('logos', 'public');
            }

            $company = Company::create(array_merge($this->handleCompanyAttributes($validated)));
            $company->locations()->attach($validated['locations']);

            DB::commit();

            $company->notify(new CompanyRegisteredNotification($company));

            return new CompanyResource($company);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("An error occurred while creating the company: " . $e->getMessage());
        }
    }

    public function getById($company)
    {
        $companyRecord = $company->with('locations')->find($company->id);

        if (!$companyRecord) {
            return null;
        }

        return new CompanyResource($companyRecord);
    }

    public function update($company, array $validated, $avatar = null)
    {
        DB::beginTransaction();

        try {
            if ($avatar) {
                if ($company->avatar && Storage::exists('public/' . $company->avatar)) {
                    Storage::delete('public/' . $company->avatar);
                }

                $file_name = time() . '.' . $avatar->extension();
                $validated['avatar'] = 'logos/' . $file_name;
                $avatar->storeAs('logos', $file_name);
            } else {
                if (empty($validated['avatar']) && $company->avatar) {
                    $validated['avatar'] = $company->avatar;
                }
            }

            $company->update($this->handleCompanyAttributes($validated));

            if (isset($validated['locations'])) {
                $company->locations()->sync($validated['locations']);
            }

            DB::commit();
            return new CompanyResource($company);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("An error occurred while updating the company: " . $e->getMessage());
        }
    }

    public function delete($company)
    {
        $company->billingSetting()->delete();
        $company->payment()->delete();

        $company->delete();
        return $company;
    }

    public function getCompanyJobs($company)
    {
        return new JobCollection($company->job);
    }

    public function getCompanyRecruiters($company)
    {
        return $company->recruiter()->with('user')->get()->pluck('user');
    }

    public function getLocations($request)
    {
        $company = Company::findOrFail($this->getAuthenticatedRecruiter($request)->company_id);
        return new LocationCollection($company->locations);
    }

    public function updateLocation($company, array $validated)
    {
        if (isset($validated['locations'])) {
            $company->locations()->sync($validated['locations']);
        }
        return $company;
    }

    public function getSubscription($request)
    {
        return $this->getAuthenticatedRecruiter($request)->company->subscriptions()->with('subscription')->first();
    }

    public function updateSubscription($company, array $validated)
    {
        $subscription = CompanySubscription::where('company_id', $company->id)->first();

        $subscription->subscription_id = $validated['subscription_id'];
        $subscription->update();

        return $subscription;
    }

    public function getBillingSettings($request)
    {
        return $this->getAuthenticatedRecruiter($request)->company->billingSetting;
    }

    public function updateBillingSetting($company, array $validated)
    {
        $billingSettings = $company->billingSetting();

        $updates = [];

        if (array_key_exists('email', $validated)) {
            $updates['email'] = $validated['email'];
        }

        if (array_key_exists('is_autorenew', $validated)) {
            $updates['is_autorenew'] = $validated['is_autorenew'];
        }

        $billingSettings->update($updates);
        return $billingSettings;
    }

    public function getPaymentMethods($request)
    {
        return new PaymentMethodCollection($this->getAuthenticatedRecruiter($request)->company->payment);
    }

    public function createPaymentMethod(array $validated, $request)
    {
        $company = $this->getAuthenticatedRecruiter($request)->company;

        DB::beginTransaction();

        try {
            $validated['company_id'] = $company->id;
            $paymentMethod = $company->payment()->create(array_merge($this->handlePaymentMethodAttributes($validated)));

            DB::commit();
            return new PaymentMethodResource($paymentMethod);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("An error occurred while creating the payment method: " . $e->getMessage());
        }
    }

    public function updatePaymentMethod($payment, array $validated)
    {
        DB::beginTransaction();

        try {
            $payment->update($this->handlePaymentMethodAttributes($validated));

            DB::commit();
            return new PaymentMethodResource($payment);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("An error occurred while updating the payment method: " . $e->getMessage());
        }
    }

    public function deletePaymentMethod($payment)
    {
        $payment->delete();
        return $payment;
    }

    public function setDefaultPaymentMethod($paymentId, array $validated, $request)
    {
        $company = $this->getAuthenticatedRecruiter($request)->company;

        if ($validated['isActive']) {
            $company->payment()->where('id', '!=', $paymentId)->update(['is_active' => false]);
        }

        $paymentMethod = $company->payment()->find($paymentId);

        $paymentMethod->update([
            'is_active' => $validated['isActive']
        ]);

        return $paymentMethod;
    }
}
