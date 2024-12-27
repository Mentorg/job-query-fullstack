<?php

namespace App\Interfaces;

interface CompanyServiceInterface
{
  public function getCompanies();

  public function create(array $validated, $request);

  public function getById($company);

  public function update($company, array $fields);

  public function delete($company);

  public function getCompanyJobs($company);

  public function getCompanyRecruiters($company);

  public function getLocations($request);

  public function updateLocation($company, array $validated);

  public function getSubscription($request);

  public function updateSubscription($company, array $validated);

  public function getBillingSettings($request);

  public function updateBillingSetting($company, array $validated);

  public function getPaymentMethods($request);

  public function createPaymentMethod(array $validated, $request);

  public function updatePaymentMethod($payment, array $fields);

  public function deletePaymentMethod($payment);

  public function setDefaultPaymentMethod($paymentId, array $validated, $request);
}
