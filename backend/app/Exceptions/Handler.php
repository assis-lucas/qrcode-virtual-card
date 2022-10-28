<?php

namespace App\Exceptions;

use Exception;
use Throwable;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Exception $exception, $request) {
            if ($exception instanceof HttpException) {
                $code = $exception->getStatusCode();
                $message = Response::$statusTexts[$code];

                return response()->json($message, $code);
            }

            if ($exception instanceof ValidationException) {
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Error',
                    'errors' => $exception->validator->errors()->getMessages(),
                ], 422);
            }

            if (env('APP_DEBUG', false)) {
                $code = $exception->getCode();
                $message = $exception->getMessage(); //Response::$statusTexts[$code];
                $file = $exception->getFile();
                $line = $exception->getLine();
                $trace = $exception->getTrace();

                return response()->json(json_encode([
                    "code"=>$code,
                    "message"=>$message,
                    "file"=>$file,
                    "line"=>$line,
                    "trace"=>$trace,
                ]), 500);
            }

            return response()->json(
                ['error' => 'Unexpected error. Please, try later'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        });
    }
}
