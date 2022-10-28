<?php

namespace App\Http\Clients\Github;

use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Exception\RequestException;

class LiveGithubClient implements GithubClientInterface
{
    public function __construct(private GuzzleClient $client)
    {
    }

    public function retrieveProfile(string $profile): bool|object
    {
        try {
            $response = $this->client->get("users/$profile");
        } catch (RequestException) {
            return false;
        }

        $parsedResponse = json_decode((string) $response->getBody());

        if ($parsedResponse === null) {
            return false;
        }

        return $parsedResponse;
    }
}
