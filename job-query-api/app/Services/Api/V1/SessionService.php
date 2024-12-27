<?php

namespace App\Services\Api\V1;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SessionService
{
  public function create(array $fields)
  {
    $user = User::where('email', $fields['email'])->first();

    if (!$user || !Hash::check($fields['password'], $user->password)) {
      return response()->json([
        'message' => "The provided credentials are incorrect."
      ], 401);
    }

    $token = $user->createToken($user->name);

    $response = [
      'avatar' => $user->avatar,
      'email' => $user->email,
      'id' => $user->id,
      'language' => $user->language,
      'location' => $user->location,
      'name' => $user->name,
      'role' => $user->role,
      'token' => $token->plainTextToken,
    ];

    return $response;
  }

  public function delete($request)
  {
    $request->user()->tokens()->delete();
    return response()->json(['message' => 'You are now successfully logged out.']);
  }
}
