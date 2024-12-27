<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\Api\V1\SessionService;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    protected $sessionService;

    public function __construct(SessionService $sessionService)
    {
        $this->sessionService = $sessionService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);
        return response()->json($this->sessionService->create($validated));
    }

    public function destroy(Request $request)
    {
        return response()->json($this->sessionService->delete($request));
    }
}
