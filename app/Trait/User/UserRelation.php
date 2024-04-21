<?php

namespace App\Trait\User;

use App\Models\Address;

trait UserRelation
{
    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
