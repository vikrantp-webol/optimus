<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">

        @if(! app()->environment('production'))
            <meta name="robots" content="noindex">
        @endif

        {{-- CSRF Token --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Meta --}}
        @include('front.partials.meta')

        {{-- Styles --}}
        <link rel="stylesheet" href="{{ mix('/front/css/app.css') }}">

        {{-- Analytics --}}
        {{-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxx-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-xxxxxxxx-1');
        </script> --}}

        {{-- Recaptcha --}}
        {{-- <script src='https://www.google.com/recaptcha/api.js'></script> --}}
    </head>

    <body>
        <div id="app">
            @include('front.partials.header')
            
            @yield('content')
            
            @include('front.partials.footer')
        </div>

        <script src="{{ mix('/front/js/app.js') }}"></script>
        @stack('scripts')
    </body>
</html>
