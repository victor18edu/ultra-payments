<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DepositRequest;
use App\Models\User;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function deposit(DepositRequest $request)
    {
        $user = Auth::user();
        $amount = $request->input('amount');

        $this->transactionService->deposit($user, $amount);

        return response()->json(['message' => 'Depósito realizado com sucesso']);
    }

    public function transfer(Request $request)
    {
        $user = Auth::user();
        $recipient = User::find($request->input('recipient_id'));
        $amount = $request->input('amount');

        $this->transactionService->transfer($user, $recipient, $amount);

        return response()->json(['message' => 'Transferência realizada com sucesso']);
    }
}
