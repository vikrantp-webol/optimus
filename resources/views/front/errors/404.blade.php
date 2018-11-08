@extends('front.layouts.app')

@section('meta.title', '404 - Page not found')

@section('content')
    <section class="text-center">
        <h1 class="title">404</h1>
        <h2 class="subtitle">We’re sorry but we can’t find that page</h2>

        <div class="content">
            <p>This might mean that the page has been removed, changed, or you have an incorrect page address for it. You might find it useful to go back to the main navigation and look again.</p>
            <p>Alternatively, if the problem persists, please <a href="/contact">email us</a> your issue and we’ll try and resolve it as quickly as we can. Thank you for your feedback.</p>
        </div>
    </section>
@endsection
