<?php

namespace App\Repositories;

use App\Models\Transaction;
use App\Models\User;

class TransactionRepository extends BaseRepository
{
    public function __construct(?Transaction $model = null)
    {
        parent::__construct($model ?? new Transaction());
    }

    public function all(User $user, string $type)
    {
        return Transaction::with('relatedUser')->where('user_id', $user->id)->where('type', $type)->get();
    }
}
