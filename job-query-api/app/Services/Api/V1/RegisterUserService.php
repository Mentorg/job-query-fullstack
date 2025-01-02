<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\UserResource;
use App\Models\Applicant;
use App\Models\Company;
use App\Models\Location;
use App\Models\Recruiter;
use App\Models\User;

class RegisterUserService
{
  public function create(array $fields, $request)
  {
    if ($request->hasFile('avatar')) {
      $fields['avatar'] = $request->file('avatar')->store('avatars', 'public');
    }

    $locationId = $fields['location'];
    $location = Location::findOrFail($locationId);

    $user = User::create([
      'avatar' => $fields['avatar'],
      'name' => $fields['name'],
      'email' => $fields['email'],
      'password' => bcrypt($fields['password']),
      'role' => $request->has('recruiterRegistration') ? 'recruiter' : 'applicant',
      'phone' => $fields['phone'] ?? null,
      'linkedin_profile' => $fields['linkedin_profile'] ?? null,
      'timezone' => $fields['timezone'] ?? null,
      'language' => $fields['language'] ?? null,
      'location_id' => $location->id,
    ]);

    $isRecruiter = $request->get('recruiterRegistration') === 'true';
    $role = $isRecruiter ? 'recruiter' : 'applicant';
    $user->assignRole($role);

    if ($isRecruiter) {
      $this->createRecruiter($user, $fields['companies']);
    } else {
      $this->createApplicant($user);
    }

    $token = $user->createToken($request->name);

    return [
      'user' => new UserResource($user),
      'token' => $token->plainTextToken,
    ];
  }

  protected function createRecruiter(User $user, $companyId)
  {
    $company = Company::findOrFail($companyId);

    $recruiter = Recruiter::create([
      'user_id' => $user->id,
      'company_id' => $company->id,
    ]);

    $recruiter->update([
      'expertise' => 'No expertise data provided!',
      'description' => 'No description data provided!'
    ]);
  }

  protected function createApplicant(User $user)
  {
    Applicant::create(['user_id' => $user->id]);
  }
}
