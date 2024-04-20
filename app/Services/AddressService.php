<?php

namespace App\Services;

use App\Contracts\AddressGatewayInterface;

class AddressService
{
    protected $addressGateway;

    public function __construct(AddressGatewayInterface $addressGateway)
    {
        $this->addressGateway = $addressGateway;
    }

    public function getAddressByCEP($cep)
    {
        return $this->addressGateway->getAddressByCEP($cep);
    }
}
