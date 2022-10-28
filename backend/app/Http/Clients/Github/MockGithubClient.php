<?php

namespace App\Http\Clients\Github;

class MockGithubClient implements GithubClientInterface
{
    public const PROFILE_NONEXISTENT = 'PROFILE_NONEXISTENT';

    public function retrieveProfile(string $profile): bool|object
    {
        if($profile === self::PROFILE_NONEXISTENT){
            return false;
        }

        return (object) [
            'login' => $profile,
            'url' => "https://api.github.com/users/$profile",
            'bio' => 'Bio from Github ✨',
            'name' => 'User'
        ];
    }

}
