<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\AddressRepository;
use App\Repositories\UserRepository;

class UserService
{
    private $user;
    private $userRepository;
    private $addressRepository;

    public function __construct(?User $user = null)
    {
        $this->user = $user;
        $this->initRepositories();
    }

    function initRepositories(): void
    {
        $this->userRepository = $this->user ? $this->user->userRepository() : new UserRepository;
        $this->addressRepository = new AddressRepository;
    }

    public function createUser(array $userData): String
    {
        $user = $this->setCreateUser($userData);
        $this->setCreateAddress($user, $userData);

        return $user;
    }

    public function setCreateUser($userData): User
    {
        return $this->userRepository->create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => bcrypt($userData['password']),
            'date_of_birth' => $userData['date_of_birth'],
            'cpf' => $userData['cpf'],
        ]);
    }

    public function setCreateAddress(User $user, $userData): void
    {
        $this->addressRepository->create([
            'user_id' => $user->id,
            'address' => $userData['address'],
            'number' => $userData['number'],
            'zip_code' => $userData['zip_code'],
            'complement' => $userData['complement'],
        ]);
    }


}
