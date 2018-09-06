@php($tag = $tag ?? 'div')

<{{ $tag }}>
    <a href="/" class="svg-holder{{ isset($class) ? ' '.$class : null }}" title="{{ config('app.name') }}">
        <svg xmlns="http://www.w3.org/2000/svg" width="283" viewBox="0 0 283 99">
            {{-- Path --}}
        </svg>
    </a>
</{{ $tag }}>
