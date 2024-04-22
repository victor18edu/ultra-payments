<?php

namespace App\Http\Controllers;

use App\Services\AddressService;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    public function getAddressByCEP($cep, AddressService $addressService)
    {
        return $addressService->getAddressByCEP($cep);
    }
}
