<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QrCodeResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'name' => $this->name,
            'github' => $this->github,
            'linkedin' => $this->linkedin,
        ];
    }
}
