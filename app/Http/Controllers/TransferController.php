<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DepositRequest;
use App\Http\Requests\Transactions\TransferRequest;
use App\Models\User;
use App\Repositories\TransactionRepository;
use App\Services\DepositService;
use App\Services\TransactionService;
use App\Services\TransferService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransferController extends Controller
{
    protected $transferService;
    protected $transactionRepository;

    public function __construct(TransferService $transferService , TransactionRepository $transactionRepository)
    {
        $this->transferService = $transferService;
        $this->transactionRepository = $transactionRepository;
    }

    public function index()
    {
        try {
            $user = Auth::user();
            $transfers = $this->transactionRepository->all($user, 'transfer');
            return response()->json($transfers);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(TransferRequest $request)
    {
        try {
            $user = Auth::user();
            $amount = $request->input('amount');

            $this->transferService->transfer($user, $request->recipient_cpf, $amount);

            return response()->json(['message' => 'Transferência realizada com sucesso']);

        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
