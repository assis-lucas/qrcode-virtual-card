<?php

namespace App\Providers\Http;

use App\Http\Clients\Github\LiveGithubClient;
use App\Http\Clients\Github\MockGithubClient;
use App\Http\Clients\Github\GithubClientInterface;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class GithubClientProvider extends ServiceProvider implements DeferrableProvider
{
    public function provides(): array
    {
        return [GithubClientInterface::class];
    }

    public function register(): void
    {
        $this->app->bind(GithubClientInterface::class, function (Application $app): GithubClientInterface {
            if ($app->environment(['testing'])) {
                return $app->make(MockGithubClient::class);
            }

            return new LiveGithubClient(
                new GuzzleClient([
                    'base_uri' => config('services.github.base_uri'),
                    'connect_timeout' => 5,
                    'timeout' => 10,
                ])
            );
        });
    }
}
