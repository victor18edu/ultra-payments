<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return 'api';
});

Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/deposits', [DepositController::class, 'index'])->middleware('auth:sanctum');
Route::post('/deposits', [DepositController::class, 'store'])->middleware('auth:sanctum');

Route::get('/transfers', [TransferController::class, 'index'])->middleware('auth:sanctum');
Route::post('/transfer', [TransferController::class, 'store'])->middleware('auth:sanctum');

