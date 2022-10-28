<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Clients\Github\MockGithubClient;
use Tests\TestCase;
use App\Models\QrCode;
use Illuminate\Support\Str;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class QrCodeControllerTest extends TestCase
{
    /** @test */
    public function it_should_create_a_new_qr_code(): void
    {
        $request = $this->postJson(route('qr-code.store'), $match = [
            'name' => 'Lucas Assis',
            'github' => 'assis-lucas',
            'linkedin' => 'https://linkedin.com/in/assis-lucas',
        ])->assertSuccessful();

        $match['slug'] = Str::slug($match['name']);

        $request->assertJson(['slug' => $match['slug']]);
        $this->assertDatabaseHas(QrCode::class, $match);
    }

    /** @test */
    public function it_shouldnt_accept_a_slug_override(): void
    {
        $request = $this->postJson(route('qr-code.store'), $match = [
            'name' => 'Lucas Assis',
            'slug' => Str::slug('override attempt Lucas Assis'),
            'github' => 'assis-lucas',
            'linkedin' => 'https://linkedin.com/in/assis-lucas',
        ])->assertSuccessful();

        $response = json_decode($request->getContent());
        $databaseHas = $match;
        $databaseHas['slug'] = $response->slug;

        $request->assertJson(['slug' => Str::slug($match['name'])]);
        $this->assertNotEquals($match['slug'], $response->slug);
        $this->assertDatabaseHas(QrCode::class, $databaseHas);
        $this->assertDatabaseMissing(QrCode::class, $match);
    }

    /** @test */
    public function it_shouldnt_accept_repeated_name(): void
    {
        $request = $this->postJson(route('qr-code.store'), $match = [
            'name' => 'Lucas Assis',
            'github' => 'assis-lucas',
            'linkedin' => 'https://linkedin.com/in/assis-lucas',
        ])->assertSuccessful();

        $match['slug'] = Str::slug($match['name']);

        $request->assertJson(['slug' => $match['slug']]);
        $this->assertDatabaseHas(QrCode::class, $match);

        $request = $this->postJson(route('qr-code.store'), $match2 = [
            'name' => 'Lucas Assis',
            'github' => 'assis-lucas',
            'linkedin' => 'https://linkedin.com/in/assis-lucas-different',
        ])->assertJsonValidationErrors([
            'name' => 'The given name is already used.',
        ]);

        $this->assertDatabaseMissing(QrCode::class, $match2);
    }

    /** @test */
    public function it_should_throw_validation_errors_on_required_fields(): void
    {
        $this->postJson(route('qr-code.store'))
            ->assertJsonValidationErrors([
                'linkedin' => __('validation.required', ['attribute' => 'linkedin']),
                'github' => __('validation.required', ['attribute' => 'github']),
                'slug' => __('validation.required', ['attribute' => 'slug']),
                'name' => __('validation.required', ['attribute' => 'name'])
            ]);
    }

    /** @test */
    public function it_should_accept_only_url_linkedin(): void
    {
        $this->postJson(route('qr-code.store'), ['github' => 'not url', 'linkedin' => 'not url too'])
            ->assertJsonValidationErrors([
                'linkedin' => __('validation.url', ['attribute' => 'linkedin']),
            ]);
    }

    /** @test */
    public function it_should_accept_only_existent_github(): void
    {
        $this->postJson(route('qr-code.store'), ['github' => MockGithubClient::PROFILE_NONEXISTENT])
            ->assertJsonValidationErrors([
                'github' => "The given github profile doesn't exists.",
            ]);
    }
}
