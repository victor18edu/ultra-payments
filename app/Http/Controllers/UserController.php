<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\CreateUserRequest;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    public function store(CreateUserRequest $request, UserRepository $user_repository)
    {
        $data = $request->validated();

        $user_repository->store($data);

        return response()->json(['message' => 'User created successfully'], 201);
    }
}
