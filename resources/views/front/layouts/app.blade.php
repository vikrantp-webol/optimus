<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

        {{-- CSRF Token --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Meta --}}
        <title>@yield('meta.title') | {{ config('app.name') }}</title>

        @hasSection('meta.description')
            <meta name="description" content="@yield('meta.description')" />
        @endif

        {{-- Open Graph --}}
        <meta property="og:title" content="@yield('meta.title') | {{ config('app.name') }}" />
        <meta property="og:url" content="{{ url()->full() }}" />
        <meta property="og:image" content="{{ url('/images/layout/og.png') }}" />

        {{-- Styles --}}
        <link rel="stylesheet" href="{{ mix('/css/app.css', 'front') }}">

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

        <script src="{{ mix('/js/app.js', 'front') }}"></script>
        @stack('scripts')
    </body>
</html>
