<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(?User $model = null)
    {
        parent::__construct($model ?? new User());
    }

    public function whereCpf(string $cpf)
    {
        return User::where('cpf', $cpf)->first();
    }
}
