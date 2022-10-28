<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('qr-code/{qrCode:slug}', [App\Http\Controllers\QrCodeController::class, 'show'])->name('qr-code.show');
Route::post('qr-code', [App\Http\Controllers\QrCodeController::class, 'store'])->name('qr-code.store');
