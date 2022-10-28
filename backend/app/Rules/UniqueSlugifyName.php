<?php

namespace App\Rules;

use App\Models\QrCode;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Rule;

class UniqueSlugifyName implements Rule
{
    public function passes($attribute, $value): bool
    {
        $qrCode = QrCode::whereSlug(Str::slug($value))->first();

        if($qrCode){
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return 'The given name is already used.';
    }
}
