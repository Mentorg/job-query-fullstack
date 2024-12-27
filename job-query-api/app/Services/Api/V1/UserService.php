<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Interfaces\UserServiceInterface;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
  protected function getAuthenticatedUser($request)
  {
    return $request->user();
  }

  public function getUsers()
  {
    return new UserCollection(User::all());
  }

  public function getById($request)
  {
    $user = $this->getAuthenticatedUser($request);
    $user->load('location');

    if (!$user) {
      return null;
    }

    return new UserResource($user);
  }

  public function update($user, array $validated)
  {
    $user->update([
      'name' => $validated['name'],
      'phone' => $validated['phone'],
      'linkedin_profile' => $validated['linkedinProfile'],
      'location_id' => $validated['locationId'],
    ]);

    return new UserResource($user);
  }

  public function delete($user)
  {
    $user->delete();
    return $user;
  }

  public function updateEmail(array $validated, $request)
  {
    $user = $this->getAuthenticatedUser($request);
    $user->update(['email' => $validated['email']]);

    return new UserResource($user);
  }

  public function updatePassword($validated, $request)
  {
    $user = User::find($request->user()->id);

    if (!Hash::check($validated['current_password'], $user->password)) {
      throw new Exception('Current password does not match the provided password!');
    }

    if (strcmp($validated['current_password'], $validated['new_password']) == 0) {
      throw new Exception('New password cannot be the same as the current password!');
    }

    $user->password = Hash::make($validated['new_password']);
    $user->save();

    return new UserResource($user);
  }

  public function updateLocaleSetting(array $fields, $request)
  {
    $user = $this->getAuthenticatedUser($request);
    $updates = [];

    if (array_key_exists('language', $fields)) {
      $updates['language'] = $fields['language'];
    }

    if (array_key_exists('timezone', $fields)) {
      $updates['timezone'] = $fields['timezone'];
    }

    if (array_key_exists('currencyId', $fields)) {
      $updates['currency_id'] = $fields['currencyId'];
    }

    if (!empty($updates)) {
      $user->update($updates);
    }

    return new UserResource($user);
  }

  public function getCurrency($request)
  {
    $user = $this->getAuthenticatedUser($request);
    return $user->currency;
  }
}
