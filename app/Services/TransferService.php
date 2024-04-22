<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Repositories\TransactionRepository;
use App\Notifications\TransactionNotification;

class TransferService
{
    protected $userRepository;
    protected $transactionRepository;

    public function __construct(UserRepository $userRepository, TransactionRepository $transactionRepository)
    {
        $this->userRepository = $userRepository;
        $this->transactionRepository = $transactionRepository;
    }

    public function transfer(User $sender, $cpf, $amount)
    {
        $recipient = $this->userRepository->whereCpf($cpf);

        $this->validation($sender, $recipient, $amount);
        $authorizationCode = 'TRANSF' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        $sender->balance -= $amount;
        $recipient->balance += $amount;

        $sender->save();
        $recipient->save();

        $this->transactionRepository->create([
            'user_id' => $sender->id,
            'related_user_id' => $recipient->id,
            'type' => 'transfer',
            'amount' => $amount,
            'authorization_code' => $authorizationCode
        ]);

        $sender->notify(new TransactionNotification('Você realizou uma transferência de R$ ' . $amount));
        $recipient->notify(new TransactionNotification('Você recebeu uma transferência de R$ ' . $amount));

        return true;
    }

    public function validation ($sender, $recipient, $amount)
    {

        if (!$sender || !$recipient) {
            throw new \Exception('Usuário remetente ou destinatário não encontrado');
        }

        // Validar o valor da transferência
        if ($amount <= 0) {
            throw new \Exception('O valor da transferência deve ser maior que zero');
        }

        // Validar se o saldo do remetente é suficiente
        if ($sender->balance < $amount) {
            throw new \Exception('Saldo insuficiente para realizar a transferência');
        }
    }
}
