<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\DepositRequest;
use App\Repositories\TransactionRepository;
use App\Services\DepositService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DepositController extends Controller
{
    protected $depositService;
    protected $transactionRepository;

    public function __construct(DepositService $depositService, TransactionRepository $transactionRepository)
    {
        $this->depositService = $depositService;
        $this->transactionRepository = $transactionRepository;
    }

    public function index()
    {
        try {
            $user = Auth::user();
            $deposits = $this->transactionRepository->all($user, 'deposit');
            return response()->json($deposits);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(DepositRequest $request)
    {
        try {
            $user = Auth::user();
            $amount = $request->input('amount');

            $this->depositService->deposit($user, $amount);

            return response()->json(['message' => 'Depósito realizado com sucesso'], 200);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
