<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\CreateUserRequest;
use App\Repositories\UserRepository;
use App\Services\UserService;

class UserController extends Controller
{
    public function store(CreateUserRequest $request, UserService $userService)
    {
        try {
            $data = $request->validated();
            $user = $userService->createUser($data);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user', 'message' => $e->getMessage()], 500);
        }
    }
}
