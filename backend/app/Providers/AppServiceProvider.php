<?php

namespace App\Providers;

use App\Rules\GithubExists;
use Illuminate\Support\ServiceProvider;
use App\Http\Clients\Github\GithubClientInterface;

class AppServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(GithubClientInterface::class, GithubExists::class);
    }


    public function boot()
    {
    }
}
