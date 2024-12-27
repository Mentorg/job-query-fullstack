<?php

namespace App\Helpers;

class ResponseHelper
{
  public static function successResponse($data, $message = 'Success', $statusCode = 200)
  {
    return response()->json([
      'status' => 'success',
      'message' => $message,
      'data' => $data
    ], $statusCode);
  }

  public static function errorResponse($message = 'Error', $statusCode = 400)
  {
    return response()->json([
      'status' => 'error',
      'message' => $message
    ], $statusCode);
  }
}
