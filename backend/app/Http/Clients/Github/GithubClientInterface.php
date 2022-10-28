<?php

namespace App\Http\Clients\Github;

interface GithubClientInterface
{
    public function retrieveProfile(string $profile): bool|object;
}
