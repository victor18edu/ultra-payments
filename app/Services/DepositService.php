<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\TransactionNotifiaction;
use App\Repositories\UserRepository;
use App\Repositories\TransactionRepository;
use App\Notifications\TransactionNotification;

class DepositService
{
    protected $userRepository;
    protected $transactionRepository;

    public function __construct(UserRepository $userRepository, TransactionRepository $transactionRepository)
    {
        $this->userRepository = $userRepository;
        $this->transactionRepository = $transactionRepository;
    }

    public function deposit(User $user, $amount)
    {
        $authorizationCode = 'DEP' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        $this->validation($user, $amount);

        // Atualizar o saldo do usuário
        $user->balance += $amount;
        $user->save();

        // Registrar a transação de depósito no histórico
        $this->transactionRepository->create([
            'user_id' => $user->id,
            'type' => 'deposit',
            'amount' => $amount,
            'authorization_code' => $authorizationCode
        ]);

        // Notificar o usuário sobre o depósito
        $user->notify(new TransactionNotification('Você recebeu um depósito de R$ ' . $amount));

        return true;
    }

    public function validation($user, $amount)
    {

        if (!$user) {
            throw new \Exception('Usuário não encontrado');
        }

        // Validar o valor do depósito
        if ($amount <= 0) {
            throw new \Exception('O valor do depósito deve ser maior que zero');
        }

    }
}
