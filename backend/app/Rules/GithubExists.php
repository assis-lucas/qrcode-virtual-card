<?php

namespace App\Rules;

use Illuminate\Support\Facades\App;
use Illuminate\Contracts\Validation\Rule;
use App\Http\Clients\Github\GithubClientInterface;

class GithubExists implements Rule
{
    public function __construct()
    {
    }

    public function passes($attribute, $value): bool
    {
        $github = App::make(GithubClientInterface::class);
        $profile = $github->retrieveProfile($value);

        if($profile){
            return true;
        }

        return false;
    }

    public function message(): string
    {
        return "The given github profile doesn't exists.";
    }
}
