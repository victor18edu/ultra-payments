<?php

namespace App\Trait\User;

use App\Models\Address;
use App\Models\Transaction;

trait UserRelation
{
    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function transactions($type)
    {
        return $this->hasMany(Transaction::class);
    }
}
