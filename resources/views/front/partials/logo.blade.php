@php($tag = $tag ?? 'span')

<{{ $tag }}>
    <a href="{{ url('/') }}">
        <img
            src="/front/images/logo.svg"
            alt="{{ config('app.name') }}"
        >
    </a>
</{{ $tag }}>
