<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\QrCodeRequest;
use App\Http\Resources\QrCodeResource;
use App\Http\Clients\Github\GithubClientInterface;

class QrCodeController extends Controller
{
    public function __construct(private GithubClientInterface $github)
    {
    }

    public function store(QrCodeRequest $request): JsonResponse
    {
        $qrCode = QrCode::create($request->validated());

        return response()->json(['slug' => $qrCode->slug]);
    }

    public function show(QrCode $qrCode): JsonResponse
    {
        $qrCode->github = $this->github->retrieveProfile($qrCode->github);
        return response()->json(new QrCodeResource($qrCode));
    }
}
