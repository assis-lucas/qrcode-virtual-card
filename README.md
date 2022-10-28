Requirements
------------

  - [PHP](https://secure.php.net/) >= 8.1
  - [Composer](https://getcomposer.org/)
  - [Docker](https://www.docker.com/)
  - [Node.js](https://nodejs.org) >= 17

> ℹ️ See the [Laravel Server Requirements](https://laravel.com/docs/9.x/installation#server-requirements)
> for Laravel specific requirements

#### Additional information

The backend service is using [Laravel Sail](https://laravel.com/docs/9.x/sail#main-content), if you prefer to run it without docker, you will need a mysql service running in your machine and up the api with `php artisan serve`.


Backend Environment
-----------------------------

> ℹ️ **Ensure your environment meets the base [requirements](#requirements)**
> (including the [Laravel Server Requirements](https://laravel.com/docs/9.x/installation#server-requirements))

  1. Create your `.env` file and generate an application key

         cd backend && cp .env.example .env

  2. Install Project dependencies and generate project key

         composer install
         php artisan key:generate

  3. Build docker containers and make them up

         docker-compose build && docker-compose up -d

  If you choose to don't use docker enviroment, please ignore the Step 3. Configure your MySQL credentials on `.env` and you should be able to make the service up with `php artisan serve`.
  **NOTE**: Running the application on localhost:8000, you will need to change `frontend/.env` variable `REACT_APP_BACKEND_URL` with the right url.

  4. Make sure everything is working fine

         `./vendor/bin/sail test` or locally `php artisan test`

  If any test got fail, check if your enviroment is fine, and try to figure out what is happening.   
  Laravel debugging is great, so you'll can fix it soon as possible!

  Frontend Environment
-----------------------------

 1. Install project dependencies

       **YARN**

         cd frontend && yarn

       **NPM**

         cd frontend && npm install

  2. Start the project (If you're running anything on port `3000` or don't want this port, you will have to change `.env` `REACT_APP_URL` variable following the picked port).

       **YARN**

         yarn start

       **NPM**

         npm run start
