<?php

namespace App\Repositories;

use App\Models\Address;

class AddressRepository extends BaseRepository
{
    public function __construct(?Address $model = null)
    {
        parent::__construct($model ?? new Address());
    }
}
