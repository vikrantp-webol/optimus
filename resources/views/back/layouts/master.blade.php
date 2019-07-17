<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <meta name="robots" content="noindex">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }} | Admin</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('/back/css/app.css') }}">

        {{-- Fonts --}}
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">
    </head>

    <body>
        @yield('content')
    </body>
</html>
