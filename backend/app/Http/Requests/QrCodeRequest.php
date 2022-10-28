<?php

namespace App\Http\Requests;

use App\Rules\GithubExists;
use App\Rules\UniqueSlugifyName;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Clients\Github\GithubClientInterface;

class QrCodeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', new UniqueSlugifyName()],
            'linkedin' => 'required|url',
            'github' => ['required', new GithubExists()],
            'slug' => 'required|string'
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['slug' => $this->name]);
    }
}
