<?php

namespace App\Services;

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

    public function transfer($senderId, $recipientId, $amount)
    {
        // Verificar se os usuários remetente e destinatário existem
        $sender = $this->userRepository->find($senderId);
        $recipient = $this->userRepository->find($recipientId);

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

        // Atualizar o saldo do remetente e do destinatário
        $sender->balance -= $amount;
        $recipient->balance += $amount;

        $sender->save();
        $recipient->save();

        // Registrar a transação de transferência no histórico
        $this->transactionRepository->create([
            'user_id' => $senderId,
            'related_user_id' => $recipientId,
            'type' => 'transfer',
            'amount' => $amount,
        ]);

        // Notificar o remetente e o destinatário sobre a transferência
        $sender->notify(new TransactionNotification('Você realizou uma transferência de R$ ' . $amount));
        $recipient->notify(new TransactionNotification('Você recebeu uma transferência de R$ ' . $amount));

        return true;
    }
}
