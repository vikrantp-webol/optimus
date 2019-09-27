<title>
    @if(isset($metaTitle) && $metaTitle)
        {{ $pageTitle = $metaTitle }}
    @elseif(isset($meta->title) && $meta->title)
        {{ $pageTitle = $meta->title }}
    @else
        {{ $pageTitle = ($pageTitle ?? null).' | '.config('app.name') }}
    @endif
</title>

@if(isset($meta->description) && $meta->description)
    <meta name="description" content="{{ $meta->description }}">
@endif

<meta property="og:title" content="{{ $ogTitle ?? $meta->og_title ?? $pageTitle }}">
<meta property="og:url" content="{{ url()->full() }}">
<meta property="og:image" content="{{
    $ogImage
    ?? (isset($meta->og_image) && $meta->og_image ? $meta->og_image : null)
    ?? asset('images/layout/og.png')
}}">

@stack('meta')

{!! $meta->additional_tags ?? null !!}
