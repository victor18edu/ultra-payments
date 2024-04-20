<?php

namespace App\Contracts;

interface AddressGatewayInterface
{
    public function getAddressByCEP(string $cep);
}
