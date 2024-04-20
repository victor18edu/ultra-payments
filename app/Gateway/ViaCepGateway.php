<?php

namespace App\Gateways;

use App\Contracts\AddressGatewayInterface;
use GuzzleHttp\Client;

class ViaCEPGateway implements AddressGatewayInterface
{
    protected $client;

    protected $cache = [];

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getAddressByCEP($cep)
    {
        if (isset($this->cache[$cep])) {
            return $this->cache[$cep];
        }

        $response = $this->client->request('GET', "https://viacep.com.br/ws/{$cep}/json");
        $addressData = json_decode($response->getBody()->getContents(), true);

        $this->cache[$cep] = $addressData;

        return $addressData;
    }
}
