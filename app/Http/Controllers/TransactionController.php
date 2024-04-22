<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DepositRequest;
use App\Http\Requests\Transactions\TransferRequest;
use App\Models\User;
use App\Services\DepositService;
use App\Services\TransactionService;
use App\Services\TransferService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    protected $depositService;
    protected $transferService;

    public function __construct(DepositService $depositService, TransferService $transferService)
    {
        $this->depositService = $depositService;
        $this->transferService = $transferService;
    }

    public function deposit(DepositRequest $request)
    {
        $user = Auth::user();
        $amount = $request->input('amount');

        $this->depositService->deposit($user, $amount);

        return response()->json(['message' => 'Depósito realizado com sucesso']);
    }

    public function transfer(TransferRequest $request)
    {
        $user = Auth::user();
        $recipient = User::find($request->input('recipient_id'));
        $amount = $request->input('amount');

        $this->transferService->transfer($user, $recipient, $amount);

        return response()->json(['message' => 'Transferência realizada com sucesso']);
    }
}
