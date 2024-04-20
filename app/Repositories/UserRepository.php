<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function store(array $data)
    {
        return User::create($data);
    }
}
